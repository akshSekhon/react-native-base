import { useNavigation } from '@react-navigation/native';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-Trainer';
import RNPermissions, { NotificationOption, openSettings, Permission } from 'react-native-permissions';
import { check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS, } from 'react-native-permissions';
// import { openAppSetting } from './openNativeApp';

// import strings from '../Assets/lang';
import { showToastMessage } from './helpers';
// import { err } from 'react-native-svg/lib/typescript/xml';

export const androidCameraPermission = () =>
  new Promise(async (resolve, reject) => {
    console.log(Platform.Version, '');
    try {
      console.log(Platform.Version, 'Platform.VersionPlatform.Version')
      if (Platform.OS === "android" && Platform.Version > 22) {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          ]);
          if (
            granted["android.permission.CAMERA"] !== "granted"
            // ||
            // granted["android.permission.READ_MEDIA_IMAGES"] !== "granted"
          ) {
            Alert.alert(
              "Alert",
              "Don't have permission to open camera",
              [{ text: "Okay", onPress: () => RNPermissions.openSettings(), }],
              { cancelable: true }
            );
            return resolve(false);
            // alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
          }
        } else {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);
          if (
            granted["android.permission.CAMERA"] !== "granted"
            // ||
            // granted["android.permission.WRITE_EXTERNAL_STORAGE"] !== "granted" ||
            // granted["android.permission.READ_EXTERNAL_STORAGE"] !== "granted"
          ) {
            Alert.alert(
              "Alert",
              "Don't have permission to open camera",
              [{ text: "Okay", onPress: () => RNPermissions.openSettings(), }],
              { cancelable: true }
            );
            return resolve(false);
            // alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
          }
        }
        return resolve(true);
      }

      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  });




// Request camera permission
export const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    handlePermissionResult(result, 'Camera');
  } else {
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    handleAndroidPermissionResult(result, 'Camera');
  }
};

// MARK:- Request contact permission

// export const requestContactPermission = async () => {
//   try {
//     if (Platform.OS === 'ios') {
//       const result = await request(PERMISSIONS.IOS.CONTACTS);
//       handlePermissionResult(result, 'Contacts');
//       return { sucess: true, result: result }
//     } else {
//       const result = await requestMultiple([
//         PERMISSIONS.ANDROID.READ_CONTACTS,
//         PERMISSIONS.ANDROID.WRITE_CONTACTS,
//         PERMISSIONS.ANDROID.READ_CONTACTS]);
//       if (result['android.permission.READ_CONTACTS'] == 'granted' || result['android.permission.WRITE_CONTACTS'] == 'granted') {
//         return { sucess: true, result: result }

//       } else {
//         return { sucess: true, result: result, error: 'Permission not granted' }
//       }
//       // handleAndroidPermissionResult(result, 'Contacts');
//     }
//   } catch (error) {
//     return { sucess: false, error: error }
//   }
// };

export const requestContactPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      // Check if permission was denied previously
      const status = await check(PERMISSIONS.IOS.CONTACTS);
      if (status === RESULTS.BLOCKED || status === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.IOS.CONTACTS);
        return handlePermissionResult(result, 'Contacts');
      } else {
        return { success: true, result: status };
      }
    } else {
      // Android permission check and request
      const status = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
      if (status === RESULTS.BLOCKED || status === RESULTS.DENIED) {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.READ_CONTACTS,
          PERMISSIONS.ANDROID.WRITE_CONTACTS
        ]);

        if (result['android.permission.READ_CONTACTS'] === 'granted' ||
          result['android.permission.WRITE_CONTACTS'] === 'granted') {
          return { success: true, result: result };
        } else {
          // If permission denied, show alert to navigate to settings
          return forceUserToSettings();
        }
      } else {
        return { success: true, result: status };
      }
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

// Force the user to go to settings if permission is denied
const forceUserToSettings = () => {
  Alert.alert(
    'Permission Required',
    'You have denied contact access. Please enable it from settings to use this feature.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() }
    ],
    { cancelable: false }
  );
  return { success: false, error: 'Permission not granted and user navigated to settings' };
};


// Request location permission
export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    handlePermissionResult(result, 'Location');
  } else {
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    handleAndroidPermissionResult(result, 'Location');
  }
};

// Request gallery permission
export const requestGalleryPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    handlePermissionResult(result, 'Gallery');
  } else {
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    handleAndroidPermissionResult(result, 'Gallery');
  }
};

// Handle iOS Permission result
const handlePermissionResult = (result: string, permissionType: string) => {
  switch (result) {
    case RESULTS.GRANTED:
      console.log(`${permissionType} permission granted`);
      break;
    case RESULTS.DENIED:
      console.log(`${permissionType} permission denied`);
      forceUserToSettings();
      break;
    case RESULTS.BLOCKED:
      console.log(`${permissionType} permission blocked, go to settings to allow`);
      forceUserToSettings();
      break;
    default:
      console.log(`${permissionType} permission status: ${result}`);
      break;
  }
};

// Handle Android Permission result
const handleAndroidPermissionResult = (result: string, permissionType: string) => {
  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    console.log(`${permissionType} permission granted`);
  } else if (result === PermissionsAndroid.RESULTS.DENIED) {
    forceUserToSettings();
    console.log(`${permissionType} permission denied`);
  } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    forceUserToSettings();
    console.log(`${permissionType} permission blocked`);
  }
};
