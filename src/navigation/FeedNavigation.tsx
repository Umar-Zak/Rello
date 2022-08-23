import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import HomeScreen from '../screens/HomeScreen';
import GiftCardDetailScreen from '../screens/GiftCardDetailScreen';

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
        name={Screens.giftDetail}  
        component={GiftCardDetailScreen}
        />
      </Stack.Navigator>
    );
}

export default FeedNavigation;