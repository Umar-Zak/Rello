import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screens from './Screens';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ErrorBoundary from '../components/ErrorBoundary';
import NewDesign from '../components/NewDesign';

const Stack = createNativeStackNavigator()
function OnboardingNavigation() {
    return (
      <ErrorBoundary>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.onboard} component={NewDesign}  />
        <Stack.Screen name={Screens.signup} component={SignUpScreen} />
        <Stack.Screen name={Screens.login} component={LoginScreen} />
        <Stack.Screen name={Screens.forgotPassword} component={ForgotPasswordScreen} />
      </Stack.Navigator>
      </ErrorBoundary>
    );
}

export default OnboardingNavigation;