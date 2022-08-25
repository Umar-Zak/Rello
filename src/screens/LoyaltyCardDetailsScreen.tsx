import React from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import CardDetailsHeader from '../components/CardDetailsHeader';
import CardDetailsLocation from '../components/CardDetailsLocation';
import Map from '../components/Map';
import SubscribeButton from '../components/SubscribeButton';
import { LoyaltyInterface } from '../models/DTOS';
import Colors from '../config/Colors';
import {subscribeToLoyaltyCard} from "../store/entities/LoyaltySlice"
import {startLoader, stopLoader} from "../store/ui/UI"
import Screens from '../navigation/Screens';
import Activity from '../components/Activity';

function LoyaltyCardDetailsScreen() {
    const selectedLoyalty = useSelector<any, LoyaltyInterface>((state: any) => state.entities.loyalty.selectedLoyalty)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const dispatch = useDispatch()
    const navigation = useNavigation()

   const handleSubscribeButtonPressed = () => {
    dispatch(startLoader())
    
    setTimeout(() => {
        dispatch(subscribeToLoyaltyCard(selectedLoyalty))
        dispatch(stopLoader())
        navigation.navigate(Screens.wallet)
    }, 2000)
    }
   
    
    return (
       <Container>
        {isLoading && <Activity/>}
        <Background source={require("../assets/geo4.png")}>
        <CardDetailsHeader name={selectedLoyalty.companyname} title="Loyalty card offered by" />
        <CardDetailsLocation/>
        <LoyaltyAmountContainer>
            <LoyaltyAmount>Ghc {selectedLoyalty.amount}.00</LoyaltyAmount>
            <Loyalty>Loyalty worth</Loyalty>
         </LoyaltyAmountContainer>
        <SubscribeButton 
        handleSubscribe={handleSubscribeButtonPressed
        } 
        />
        </Background>
        <Map/>
       </Container>
    );
}

export default LoyaltyCardDetailsScreen;

const Container = styled.View`
    flex: 1;
`

const Background = styled.ImageBackground`
    width: 100%;
    height: 380px;
`

const LoyaltyAmountContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 190px;
    z-index: 100;
    padding-left: 30px;
`

const LoyaltyAmount = styled.Text`
    color: ${Colors.green};
    margin-right: 10px;
    font-size: 30px;
    font-weight: 700;
`

const Loyalty = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 19px;
`
