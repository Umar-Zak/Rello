import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import HomeScreen from '../screens/HomeScreen';
import GiftCardDetailScreen from '../screens/GiftCardDetailScreen';
import LoyaltyCardDetailsScreen from '../screens/LoyaltyCardDetailsScreen';

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

        <Stack.Screen 
        name={Screens.loyaltyDetail} 
        component={LoyaltyCardDetailsScreen}
         />
      </Stack.Navigator>
    );
}

export default FeedNavigation;