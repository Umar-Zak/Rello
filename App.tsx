import {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import OnboardingNavigation from './src/navigation/OnboardingNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import RootContext from './src/context/RootContext';
import store from './src/store/Store';
import { useRequireLocationPermisssion } from './src/hooks/UseLocation';
export default function App() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    useRequireLocationPermisssion()
  }, [])
  
  return (
  <Provider store={store} >
     <RootContext.Provider value={{
    user, 
    setUser
   }} >
    <NavigationContainer>
      {!user && <OnboardingNavigation/>}
   {user && <AppNavigation/>}
   </NavigationContainer>
   </RootContext.Provider>
  </Provider>

    
      )
}

 