import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector, useDispatch} from "react-redux"
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
import {getDiscounts} from "../store/entities/DiscountSlice"
import {getGiftCards} from "../store/entities/GiftSlice"
import {getLoyalty} from "../store/entities/LoyaltySlice"
import {activateUser} from "../store/auth/AuthSlice"
import {getDiscounts as allDiscount, getGiftCards as allGiftCards, getLoyalties as allLoyalties} from "../models/StaticContent"
import SecureStore from '../models/SecureStore';

function RootNavigation() {
     const dispatch = useDispatch()
     const user = useSelector<any, boolean>((state: any) => state.auth.user)
    
    
     useEffect(() => {
        initializeAuth()
        dispatch(getDiscounts(allDiscount()))
        dispatch(getGiftCards(allGiftCards()))
        dispatch(getLoyalty(allLoyalties()))
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