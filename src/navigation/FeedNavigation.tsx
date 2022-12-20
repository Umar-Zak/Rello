import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator()

function FeedNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name={Screens.feed} 
        component={HomeScreen} 
        options={{
            headerShown: false
        }}
        />
         <Stack.Screen 
        name={Screens.contact} 
        component={ContactScreen}
         />
         <Stack.Screen 
        name={Screens.about} 
        component={AboutScreen}
         />
      </Stack.Navigator>
    );
}

export default FeedNavigation;