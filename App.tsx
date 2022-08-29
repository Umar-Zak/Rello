import {useEffect} from 'react'
import {Provider} from 'react-redux';
import store from './src/store/Store';
import { useRequireLocationPermisssion } from './src/hooks/UseLocation';
import RootNavigation from './src/navigation/RootNavigation';


export default function App() {
  useEffect(() => {
    useRequireLocationPermisssion()
  }, [])
  
  return (
  <Provider store={store} >
    <RootNavigation/>
  </Provider>

    
      )
}

 