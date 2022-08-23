import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import GiftCardScreen from '../screens/GiftCardScreen';
import GiftCardDetailScreen from '../screens/GiftCardDetailScreen';

const Stack = createNativeStackNavigator()
function GiftNavigation() {
    return (
       <Stack.Navigator>
        <Stack.Screen name={Screens.giftFeed} component={GiftCardScreen} />
        <Stack.Screen name={Screens.giftDetail} component={GiftCardDetailScreen} />
       </Stack.Navigator>
    );
}

export default GiftNavigation;