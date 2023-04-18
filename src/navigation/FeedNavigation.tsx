import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import ErrorBoundary from '../components/ErrorBoundary';
import ProductListScreen from '../services/ProductsListScreen';
import FAQsScreen from '../screens/FAQsScreen';
import FinancialServicesScreen from '../screens/FinancialServicesScreen';

const Stack = createNativeStackNavigator()



function FeedNavigation() {
    return (
      <ErrorBoundary>
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
         <Stack.Screen 
        name={Screens.verification} 
        component={ProductListScreen}
         />
          <Stack.Screen 
        name={Screens.faqs} 
        component={FAQsScreen}
         />
         <Stack.Screen 
         name={Screens.financial_services}
         component={FinancialServicesScreen}
          />
      </Stack.Navigator>
      </ErrorBoundary>
    );
}

export default FeedNavigation;