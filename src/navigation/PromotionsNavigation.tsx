import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import PromotionsScreen from '../screens/PromotionsScreen';
import PromotionDetailsScreen from '../screens/PromotionDetailsScreen';
import ErrorBoundary from '../components/ErrorBoundary';

const Stack = createNativeStackNavigator()
function PromotionsNavigation() {
    return (
       <ErrorBoundary>
        <Stack.Navigator>
        <Stack.Screen 
        name={Screens.promotions} 
        component={PromotionsScreen} />
        <Stack.Screen name={Screens.promotion_details} component={PromotionDetailsScreen} />
       </Stack.Navigator>
       </ErrorBoundary>
    );
}

export default PromotionsNavigation;