import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector, useDispatch} from "react-redux"
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
import {loadDiscountCards} from "../store/entities/DiscountSlice"
import {loadGiftCards} from "../store/entities/GiftSlice"
import {loadLoyaltyCards} from "../store/entities/LoyaltySlice"
import {activateUser} from "../store/auth/AuthSlice"
import SecureStore from '../models/SecureStore';
import { AnyAction } from 'redux';

function RootNavigation() {
     const dispatch = useDispatch()
     const user = useSelector<any, boolean>((state: any) => state.auth.user)
    
    
     useEffect(() => {
        initializeAuth()
        dispatch(loadDiscountCards() as unknown as AnyAction)
        dispatch(loadGiftCards() as unknown as AnyAction)
        dispatch(loadLoyaltyCards() as unknown as AnyAction)
     }, [user])


     const initializeAuth = async() => {
        const token = await SecureStore.getToken()
        if(token) dispatch(activateUser())
     }

    return (
        <NavigationContainer>
           {!user && <OnboardingNavigation/>}
           {user && <AppNavigation/>}
        </NavigationContainer>
    );
}

export default RootNavigation;