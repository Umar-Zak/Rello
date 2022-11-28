import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import Screens from './Screens';
import DiscountScreen from '../screens/DiscountScreen';
import Colors from '../config/Colors';
import FeedNavigation from './FeedNavigation';
import LoyaltyNavigation from './LoyaltyNavigation';
import WalletActivityNavigation from './WalletActivityNavigation';
import PromotionsScreen from '../screens/PromotionsScreen';
import TransactionsChart from '../components/TransactionsCharts';

const Tab = createBottomTabNavigator();
function AppNavigation() {
    return (
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
        name={Screens.discount} 
        component={DiscountScreen}
        options={{
            tabBarIcon: ({size, color}) => <AntDesign size={size} color={color} name='shoppingcart' />
        }}
         />
         <Tab.Screen 
        name={Screens.promotions} 
        component={PromotionsScreen}
        options={{
            tabBarIcon: ({size, color}) => <AntDesign size={size} color={color} name='Trophy' />
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
        <Tab.Screen 
        name={Screens.analytics} 
        component={TransactionsChart} 
        options={{
            tabBarIcon: ({size, color, focused}) => <AntDesign size={size} color={color} name='barschart' />,
            headerShown: false
        }}
        />
       </Tab.Navigator>
    );
}

export default AppNavigation;