import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screens from './Screens';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator()
function OnboardingNavigation() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.onboard} component={SplashScreen}  />
        <Stack.Screen name={Screens.signup} component={SignUpScreen} />
        <Stack.Screen name={Screens.login} component={LoginScreen} />
      </Stack.Navigator>
    );
}

export default OnboardingNavigation;