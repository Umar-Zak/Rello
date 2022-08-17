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


export default function App() {
  return (
   <NavigationContainer>
    <OnboardingNavigation/>
   </NavigationContainer>
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
