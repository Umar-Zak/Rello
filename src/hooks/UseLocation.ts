import * as Location from "expo-location"
import { Alert } from "react-native"
import {Platform} from "react-native"
import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import SecureStore from "../models/SecureStore"
const ERROR_MESSAGE = "Allow access to your location to access all features of this app"



export const useRequireLocationPermisssion = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync()
  if(status !== "granted") return Alert.alert("Warning", ERROR_MESSAGE)
}

export const useNotifications = async () => {

  let token;

  // if (Platform.OS === 'android') {
  //   await Notifications.setNotificationChannelAsync('default', {
  //     name: 'default',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus == 'granted') {
      token = (await Notifications.getExpoPushTokenAsync()).data as string;
      await SecureStore.storeDeviceToken(token)
  
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    }
    
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}