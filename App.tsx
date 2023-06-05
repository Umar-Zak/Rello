import {useEffect} from 'react'
import {Provider} from 'react-redux';
import * as Sentry from "sentry-expo"
import { ConfigCatProvider,PollingMode } from "configcat-react";
import store from './src/store/Store';
import { useRequireLocationPermisssion, useNotifications } from './src/hooks/UseLocation';
import RootNavigation from './src/navigation/RootNavigation';
import SampleLoginForm from './src/components/Playground';


Sentry.init({
  dsn: "https://2f49fd9e3a9043d88c72045b552e87ad@o342493.ingest.sentry.io/6737786",
  enableInExpoDevelopment: true,
  debug: true,
  // enableNative: true
});



export default function App() {

  useEffect(() => {
    // useRequireLocationPermisssion()
    useNotifications()
    
  }, [])
  
  return (
  <ConfigCatProvider 
   sdkKey="dCTbCIz1R0KGMh9FhYXtAA/k7pgY2Hia02GlWqURZKI0g" 
   pollingMode={PollingMode.AutoPoll}
   options={{
    pollIntervalSeconds: 10
   }}
  >
    <Provider store={store} >
    <RootNavigation/>
  </Provider>
  </ConfigCatProvider>

  // <SampleLoginForm/>
  
  
      )
}

 