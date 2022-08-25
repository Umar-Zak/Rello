import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import LoyaltyCardDetailsScreen from '../screens/LoyaltyCardDetailsScreen';

const Stack = createNativeStackNavigator()
function LoyaltyNavigation() {
    return (
       <Stack.Navigator>
        <Stack.Screen name={Screens.loyaltyFeed} component={LoyaltyScreen} />
        <Stack.Screen name={Screens.loyaltyDetail} component={LoyaltyCardDetailsScreen} />
       </Stack.Navigator>
    );
}

export default LoyaltyNavigation;