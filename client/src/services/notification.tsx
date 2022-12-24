import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    //①このアプリからのPush通知の許可を取得
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      //②初回起動時は許可ダイアログを出してユーザからPush通知の許可を取得
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      //許可がない場合
      return null;
    }
    //③通知用トークンの取得
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    //実機以外の場合
    alert('Must use physical device for Push Notifications');
  }
  return token;
}