


// const notification = remoteMessage.data;
// const notificationData = JSON.parse(notification?.data);
// const { uuid, sender, channel } = notificationData


export type NotifiType = 'deposit' | 'withdraw'|'lottery'
export type NotifiStatus = 'Success' | 'Pending'
export interface NotificationBase<T> {
    type: NotifiType,
    status: NotifiStatus,
    data?: T,
}

export type NotificationDataType = NotificationBase<Notifi_CAllingData>

export interface Notifi_CAllingData{

}