import {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppTextInput from './src/components/AppTextInput';
import Button from './src/components/Button';
import Screen from './src/components/Screen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingNavigation from './src/navigation/OnboardingNavigation';
import GiftCard from './src/components/GiftCard';
import DiscountCard from './src/components/DiscountCard';
import LoyaltyCard from './src/components/LoyaltyCard';
import HomeScreen from './src/screens/HomeScreen';
import AppNavigation from './src/navigation/AppNavigation';
import RootContext from './src/context/RootContext';

export default function App() {
  const [user, setUser] = useState(false)
  return (
   <RootContext.Provider value={{
    user, 
    setUser
   }} >
    <NavigationContainer>
      {!user && <OnboardingNavigation/>}
   {user && <AppNavigation/>}
   </NavigationContainer>
   </RootContext.Provider>

    
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  }
});
