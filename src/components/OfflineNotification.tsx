import React from 'react';
import  Constants  from 'expo-constants';
import "styled-components"
import styled from 'styled-components/native';
import { useNetInfo } from '@react-native-community/netinfo';
import Colors from '../config/Colors';


const OfflineNotification = () => {
    const netInfo = useNetInfo()


    if(netInfo.type === "unknown" && netInfo.isInternetReachable === false)
        return (  
        <Container> 
        <Text>Slow internet connection or no internet</Text>
        </Container>
        );

        return null
   
}


 

export default OfflineNotification;

const Container = styled.View`
     width:90%;
     height:60px;
     align-items:center;
     justify-content:center;
     position:absolute;
     top:${Constants.statusBarHeight + 50}px;
     z-index:100;
     background: #001528;
     margin-left: 5%;
     border: 1px solid ${Colors.green};
     border-radius: 5px;
`

const Text = styled.Text`
    color: white;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
`