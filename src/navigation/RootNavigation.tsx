import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector, useDispatch} from "react-redux"
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
import {loadDiscountCards} from "../store/entities/DiscountSlice"
import {loadGiftCards} from "../store/entities/GiftSlice"
import {loadLoyaltyCards} from "../store/entities/LoyaltySlice"
import {activateUser, loadUserProfile} from "../store/auth/AuthSlice"
import SecureStore from '../models/SecureStore';
import { AnyAction } from 'redux';
import Activity from '../components/Activity';

function RootNavigation() {
     const dispatch = useDispatch()
     const user = useSelector<any, boolean>((state: any) => state.auth.user)
     const [isAppReady, setIsAppReady] = useState(false)
    
     useEffect(() => {
        initializeAuth()
        dispatch(loadDiscountCards() as unknown as AnyAction)
        dispatch(loadGiftCards() as unknown as AnyAction)
        dispatch(loadLoyaltyCards() as unknown as AnyAction)
        dispatch(loadUserProfile() as unknown as AnyAction)
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