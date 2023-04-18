import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import DiscountScreen from '../screens/DiscountScreen';
import DiscountDetailsScreen from '../screens/DiscountDetailsScreen';
import ErrorBoundary from '../components/ErrorBoundary';

const Stack = createNativeStackNavigator()
function DiscountNavigation() {
    return (
      <ErrorBoundary>
         <Stack.Navigator>
        <Stack.Screen name={Screens.discount} component={DiscountScreen} />
        <Stack.Screen name={Screens.discountDetails} component={DiscountDetailsScreen} />
       </Stack.Navigator>
      </ErrorBoundary>
    );
}

export default DiscountNavigation;