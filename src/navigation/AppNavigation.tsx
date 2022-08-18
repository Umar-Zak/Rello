import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import Screens from './Screens';
import HomeScreen from '../screens/HomeScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import DiscountScreen from '../screens/DiscountScreen';
import WalletScreen from '../screens/WalletScreen';
import Colors from '../config/Colors';

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
        component={HomeScreen} 
        options={{
            tabBarIcon: ({size, color}) => <AntDesign size={size} color={color} name='home' />,
            headerShown: false
        }}
        />
        <Tab.Screen 
        name={Screens.loyalty} 
        component={LoyaltyScreen}
        options={{
            tabBarIcon: ({size, color}) => <MaterialIcons size={size} color={color} name='loyalty' />,
            
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
        name={Screens.wallet} 
        component={WalletScreen} 
        options={{
            tabBarIcon: ({size, color, focused}) => <AntDesign size={size} color={color} name='wallet' />
        }}
        />
       </Tab.Navigator>
    );
}

export default AppNavigation;