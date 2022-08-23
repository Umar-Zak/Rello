import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector} from "react-redux"
import OnboardingNavigation from './OnboardingNavigation';
import AppNavigation from './AppNavigation';
function RootNavigation() {
     const user = useSelector<any, boolean>((state: any) => state.auth.user)
     useEffect(() => {}, [user])
    return (
        <NavigationContainer>
           {!user && <OnboardingNavigation/>}
           {user && <AppNavigation/>}
        </NavigationContainer>
    );
}

export default RootNavigation;