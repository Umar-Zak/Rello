import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector, useDispatch} from "react-redux"
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
import {activateUser} from "../store/auth/AuthSlice"
import SecureStore from '../models/SecureStore';
import Activity from '../components/Activity';

function RootNavigation() {
     const dispatch = useDispatch()
     const user = useSelector<any, boolean>((state: any) => state.auth.user)
     const [isAppReady, setIsAppReady] = useState(false)
    
     useEffect(() => {
        initializeAuth()
       setTimeout(() => {
         setIsAppReady(true)
       }, 300)
     }, [user])


     const initializeAuth = async() => {
        const token = await SecureStore.getToken()
        if(token) dispatch(activateUser())
     }

     if(!isAppReady) return <Activity/>

    return (
        <NavigationContainer>
           {!user && <OnboardingNavigation/>}
           {user && <AppNavigation/>}
        </NavigationContainer>
    );
}

export default RootNavigation;