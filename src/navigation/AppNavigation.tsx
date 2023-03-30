import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons";
import Screens from './Screens';
import DiscountScreen from '../screens/DiscountScreen';
import Colors from '../config/Colors';
import FeedNavigation from './FeedNavigation';
import LoyaltyNavigation from './LoyaltyNavigation';
import WalletActivityNavigation from './WalletActivityNavigation';
import PromotionsNavigation from './PromotionsNavigation';
import DiscountNavigation from './DiscountNavigation';
import ErrorBoundary from '../components/ErrorBoundary';

const Tab = createBottomTabNavigator();
function AppNavigation() {
    return (
       <ErrorBoundary>
        <Tab.Navigator
       screenOptions={{
        tabBarActiveTintColor: Colors.green
       }}
       >
        <Tab.Screen 
        name={Screens.home} 
        component={FeedNavigation} 
        options={{
            tabBarIcon: ({size, color}) => <AntDesign size={size} color={color} name='home' />,
            headerShown: false
        }}
        />
        <Tab.Screen 
        name={Screens.loyalty} 
        component={LoyaltyNavigation}
        options={{
            tabBarIcon: ({size, color}) => <MaterialIcons size={size} color={color} name='loyalty' />,
            headerShown: false
            
        }}
         />
        <Tab.Screen 
        name={Screens.dis} 
        component={DiscountNavigation}
        options={{
            tabBarIcon: ({size, color}) => <AntDesign size={size} color={color} name='shoppingcart' />,
            headerShown: false
        }}
         />
         <Tab.Screen 
        name={Screens.promo} 
        component={PromotionsNavigation}
        options={{
            tabBarIcon: ({size, color}) => <Entypo size={size} color={color} name='code' />,
            headerShown: false
        }}
         />

        <Tab.Screen 
        name={Screens.wallets} 
        component={WalletActivityNavigation} 
        options={{
            tabBarIcon: ({size, color, focused}) => <AntDesign size={size} color={color} name='wallet' />,
            headerShown: false
        }}
        />
       </Tab.Navigator>
       </ErrorBoundary>
    );
}

export default AppNavigation;