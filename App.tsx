import {useEffect} from 'react'
import {Provider} from 'react-redux';
import * as Sentry from "sentry-expo"
import store from './src/store/Store';
import { useRequireLocationPermisssion } from './src/hooks/UseLocation';
import RootNavigation from './src/navigation/RootNavigation';



Sentry.init({
  dsn: "https://2f49fd9e3a9043d88c72045b552e87ad@o342493.ingest.sentry.io/6737786",
  enableInExpoDevelopment: true,
  debug: true
});



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

 