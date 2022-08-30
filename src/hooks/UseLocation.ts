import * as Location from "expo-location"
import { Alert } from "react-native"

const ERROR_MESSAGE = "Allow access to your location to access all features of this app"



export const useRequireLocationPermisssion = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync()
  if(status !== "granted") return Alert.alert("Warning", ERROR_MESSAGE)
}