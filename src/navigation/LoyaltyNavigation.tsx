import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import LoyaltyCardDetailsScreen from '../screens/LoyaltyCardDetailsScreen';
import ErrorBoundary from '../components/ErrorBoundary';

const Stack = createNativeStackNavigator()
function LoyaltyNavigation() {
    return (
       <ErrorBoundary>
        <Stack.Navigator>
        <Stack.Screen name={Screens.loyaltyFeed} component={LoyaltyScreen} />
        <Stack.Screen name={Screens.loyaltyDetail} component={LoyaltyCardDetailsScreen} />
       </Stack.Navigator>
       </ErrorBoundary>
    );
}

export default LoyaltyNavigation;