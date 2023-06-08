import React, {useEffect, useState} from 'react';
import {Alert} from "react-native"
import * as Notifications from "expo-notifications"
import { NavigationContainer } from '@react-navigation/native';
import { AnyAction } from 'redux';
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
import {activateUser, logoutUser} from "../store/auth/AuthSlice"
import SecureStore from '../models/SecureStore';
import OfflineNotification from '../components/OfflineNotification';
import ErrorModal from '../components/ErrorModal';
import {startLoader, stopLoader} from "../store/ui/UI"
import Auth from '../services/Auth';
import LoyaltyService from '../services/LoyaltyService';
import {initializeRedeemedLoyalties} from "../store/entities/LoyaltySlice"
import Skeleton from '../components/Skeleton';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import Activity from '../components/Activity';




function RootNavigation() {
     const dispatch = useAppDispatch()
     const user = useAppSelector((state) => state.auth.user)
     const showErrorModal = useAppSelector((state) => state.ui.showErrorModal)
     const errorMessage = useAppSelector((state) => state.ui.errorMessage)
     const [isAppReady, setIsAppReady] = useState(false)
    
     useEffect(() => {
        initializeAuth()
        const subscription = Notifications.addNotificationReceivedListener(notification => {
         
         if(notification.request.content.data.id !== "RD")
            dispatch(logoutUser())
            
           else {
            const content = notification.request.content
            handleLoyaltyRedemptionPrompt(content)
           }
       });
      
       setTimeout(() => {
         setIsAppReady(true)
       }, 2000)

       return () => subscription.remove();
     }, [user])


     const handleLoyaltyRedemptionPrompt = (content: Notifications.NotificationContent) => {
      
      Alert.alert("Request to redeem points", content.body as string, [
         {
            text: "Approve",
            onPress: async () => {
               
               try {
                  dispatch(startLoader() as unknown as AnyAction)
                  const results = await LoyaltyService.approveRedemtion(content.data.redemption_id as string)
                  dispatch(initializeRedeemedLoyalties(results) as unknown as AnyAction)
                  dispatch(stopLoader() as unknown as AnyAction)
                  Alert.alert("Success", "Redemption completed successfully")

               } catch (error) {
                  dispatch(stopLoader() as unknown as AnyAction)
                  Alert.alert("Error", "Unexpected error approving redemption")

               }
            }
         },
         {
            text: "Ignore",
            onPress: () => {
               console.log("Ignoring this prompt");
            }
         }
      ] )
     }
    

     const initializeAuth = async() => {
      try {
         const deviceId = await SecureStore.getDeviceToken()
         if(deviceId)
           await Auth.verifyDevice()
         const token = await SecureStore.getToken()
         if(token) dispatch(activateUser())
      } catch (error:any) {
         Auth.logout()
         dispatch(logoutUser())
      }
       
     }

     if(!isAppReady) return <Activity prompt='Loading...'  />

    return (
       <>
       {/* <Activity/> */}
       <OfflineNotification/>
       {showErrorModal && <ErrorModal message={errorMessage} />}
        <NavigationContainer>
           {!user && <OnboardingNavigation/>}
           {user && <AppNavigation/>}
        </NavigationContainer>
       </>
    );
}

export default RootNavigation;