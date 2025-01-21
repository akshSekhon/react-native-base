import notifee, { AndroidImportance, EventDetail, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
// import { setItem } from './AsyncStorage';
// import { saveFcmTokenToRedux } from '../redux/actions/auth';
// import { saveFcmTokenToLocal } from '../GC/StorageHelper';
import { setFirebaseTokenIntoRedux } from '../../Redux/user/user.action';
import { setItem } from '../Storage/Async';
import { NotificationDataType, Notifi_CAllingData, NotifiType } from './notification.types';
import { notifiEventEmitter } from './NotifiEventEmitter';

// MARK: - Request User Permission
export async function requestUserPermission(callback = () => { }) {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
        title: 'Notification Permission',
        message: 'Allow this app to post notifications?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === 'never_ask_again') {
        await getFcmToken();
        callback(false);
      } else {
        callback(true);
      }
    } catch (err) {
      console.warn('requestUserPermission error:', err);
    }
  } else {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await getFcmToken();
      callback(false);
    } else {
      callback(true);
    }
  }
}


// MARK: - Get FCM Token
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM token:', token);
    setFirebaseTokenIntoRedux(token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};


// MARK: - Notification Listener
export const notificationListener = async () => {
  const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
    console.log('handleIncomingNotification remoteMessage remoteMessage :---', remoteMessage);

    await handleIncomingNotification(remoteMessage, 'forground');
  });

  const unsubscribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('setBackgroundMessageHandler remoteMessage remoteMessage :---', remoteMessage);

      await handleIncomingNotification(remoteMessage, 'background');
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification opened:', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      console.log('Initial notification:', remoteMessage);
    })
    .catch((error) => {
      console.error('Error getting initial notification:', error);
    });

  messaging().onTokenRefresh(async (token) => {
    console.log('FCM token refreshed:', token);
    setFirebaseTokenIntoRedux(token);
  });

  const unsubscribeNotifee = notifee.onForegroundEvent(async ({ type, detail }) => {
    if (type === EventType.ACTION_PRESS) {
      await handleNotificationAction({ type, detail });
    }
    if (type === EventType.PRESS) {
      await handleNotificationAction({ type, detail });
    }
  });

  return () => {
    unsubscribeForeground();
    // unsubscribeBackground();
    unsubscribeNotifee();
  };
};


// MARK: - Handle Incoming Notification
const handleIncomingNotification = async (remoteMessage, status: 'background' | 'forground') => {
  const notification = remoteMessage.data as NotificationDataType
  console.log( 'typeoftypeof:---', typeof remoteMessage.data);
  
  // const notificationData = JSON.parse(notification?.data);

  console.log('handleIncomingNotification notification notification :---', notification);
  // console.log('handleIncomingNotification finalData :---', finalData);
  // const { callTime, setcurrentCallData } = useContext(CallContext)
  notifiEventEmitter.emit('newNotificationReceive', notification);
  await onDisplayNormalNotification(remoteMessage)
};



// MARK: - Display Normal Notification
async function onDisplayNormalNotification(data) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    data: data?.data,
    android: { channelId },
    ios: { sound: 'default' },
  });
}

// MARK: - Handle Notification Actions
const handleNotificationAction = async ({ type, detail }: { type: EventType, detail: EventDetail }) => {
  console.log('handleNotificationAction type :---', type);

  const actionId = detail.pressAction?.id
  // const notification = detail?.notification?.data
  const notification = detail?.notification?.data as NotificationDataType | undefined
  console.log('handleNotificationAction notification?.notification :----', notification);

  const notifiData = notification?.data // as { calling_status: CallingStatus, uuid: string, channel: string, callingType: CallingType, sender: ContactItem }

  if (type === EventType.PRESS) {
    if (notification?.type === 'deposit') {
      // await pushTo('IncomingCallScreen', { channel, uuid, calleDetail: sender, callStatus: 'ringing' })
    }
  }
  else if (type === EventType.ACTION_PRESS) {
    switch (actionId) {
      case 'answer':
        console.log('Answer action triggered');
        // stopRingtone();
        break;
      case 'decline':
        console.log('Decline action triggered');

        // stopRingtone();
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  }

};

