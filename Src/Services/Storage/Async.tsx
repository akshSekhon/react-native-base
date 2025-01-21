import AsyncStorage from "@react-native-async-storage/async-storage"

export type StarageKey = {
    isAppAlreadyLaunched:'isAppAlreadyLaunched'
    onBoarding:'onBoarding'
    fcmToken:'FCM_Token'
}

export function setItem (key: keyof StarageKey, data: any) {
    data = JSON.stringify(data);
    return  AsyncStorage.setItem(key,data)
}
export async function getItem(key: keyof StarageKey) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then((data:any) => {
            resolve(JSON.parse(data));
        }).catch((err) => reject(err))
    })
}