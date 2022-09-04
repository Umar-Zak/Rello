import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Screens from './Screens';
import WalletScreen from '../screens/WalletScreen';
import WalletDetailScreen from '../screens/WalletDetailScreen';

const Stack = createNativeStackNavigator()

function WalletActivityNavigation() {
    return (
       <Stack.Navigator>
        <Stack.Screen name={Screens.wallet} component={WalletScreen} />
        <Stack.Screen name={Screens.walletDetail} component={WalletDetailScreen} />
       </Stack.Navigator>
    );
}

export default WalletActivityNavigation;