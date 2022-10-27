import React, {useEffect, useState} from 'react';
import * as Notifications from "expo-notifications"
import { NavigationContainer } from '@react-navigation/native';
import {useSelector, useDispatch} from "react-redux"
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
import {activateUser} from "../store/auth/AuthSlice"
import SecureStore from '../models/SecureStore';
import Activity from '../components/Activity';
import OfflineNotification from '../components/OfflineNotification';
import ErrorModal from '../components/ErrorModal';
import {logoutUser} from "../store/auth/AuthSlice"
import Auth from '../services/Auth';
function RootNavigation() {
     const dispatch = useDispatch()
     const user = useSelector<any, boolean>((state: any) => state.auth.user)
     const showErrorModal = useSelector<any, boolean>((state: any) => state.ui.showErrorModal)
     const errorMessage = useSelector<any, string>((state: any) => state.ui.errorMessage)
     const [isAppReady, setIsAppReady] = useState(false)
    
     useEffect(() => {
        initializeAuth()
        const subscription = Notifications.addNotificationReceivedListener(notification => {
         dispatch(logoutUser())
       });
      
       setTimeout(() => {
         setIsAppReady(true)
       }, 2000)

       return () => subscription.remove();
     }, [user])

    

     const initializeAuth = async() => {
      try {
         await Auth.verifyDevice()
         const token = await SecureStore.getToken()
         if(token) dispatch(activateUser())
      } catch (error) {
         Auth.logout()
         dispatch(logoutUser())
      }
       
     }

     if(!isAppReady) return <Activity/>

    return (
       <>
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