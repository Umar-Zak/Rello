import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import PromotionsScreen from '../screens/PromotionsScreen';
import PromotionDetailsScreen from '../screens/PromotionDetailsScreen';

const Stack = createNativeStackNavigator()
function PromotionsNavigation() {
    return (
       <Stack.Navigator>
        <Stack.Screen 
        name={Screens.promotions} 
        component={PromotionsScreen} />
        <Stack.Screen name={Screens.promotion_details} component={PromotionDetailsScreen} />
       </Stack.Navigator>
    );
}

export default PromotionsNavigation;