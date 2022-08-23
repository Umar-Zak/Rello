import {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import OnboardingNavigation from './src/navigation/OnboardingNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import RootContext from './src/context/RootContext';
import store from './src/store/Store';
import { useRequireLocationPermisssion } from './src/hooks/UseLocation';
import RootNavigation from './src/navigation/RootNavigation';
export default function App() {
 
const user = false
  useEffect(() => {
    useRequireLocationPermisssion()
  }, [user])
  
  return (
  <Provider store={store} >
    <RootNavigation/>
  </Provider>

    
      )
}

 