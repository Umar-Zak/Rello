import React from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import "styled-components"
import styled from "styled-components/native"
import CardDetailsHeader from '../components/CardDetailsHeader';
import CardDetailsLocation from '../components/CardDetailsLocation';
import Map from '../components/Map';
import SubscribeButton from '../components/SubscribeButton';
import { GiftCardInterface } from '../models/DTOS';
import Colors from '../config/Colors';
import {subscribeToGiftCard} from "../store/entities/GiftSlice"
import {startLoader, stopLoader} from "../store/ui/UI"
import Screens from '../navigation/Screens';
import Activity from '../components/Activity';

function GiftCardDetailScreen() {
    const selectedGiftCard = useSelector<any, GiftCardInterface>((state: any) => state.entities.gift.selectedGiftCard)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleSubcribeButtonPressed = () => {
        dispatch(startLoader())
        
        setTimeout(() => {
        dispatch(subscribeToGiftCard(selectedGiftCard))
        dispatch(stopLoader())
        navigation.goBack()
        navigation.navigate(Screens.wallet as never)

        }, 2000)
    }

    return (
       <Container>
       {isLoading && <Activity/>}
        <Background>
            <OverFlow/>
        <CardDetailsHeader 
        title="Gift card by"
        name={selectedGiftCard.companyname || ""}
         />
         <CardDetailsLocation/>
         <GiftAmountContainer>
            <GiftAmount>Ghc {selectedGiftCard.count}.00</GiftAmount>
            <Gift>Gift worth</Gift>
         </GiftAmountContainer>
        <SubscribeButton handleSubscribe={handleSubcribeButtonPressed} />
        </Background>
        <Map/>
       </Container>
    );
}

export default GiftCardDetailScreen;

const Container = styled.View`
    flex: 1;
`

const Background = styled.View`
    width: 100%;
    height: 380px;
    background: ${Colors.deep_green}
`
const OverFlow = styled.View`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 80;
`

const GiftAmountContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 190px;
    z-index: 100;
    padding-left: 30px;
`

const GiftAmount = styled.Text`
    color: ${Colors.green};
    margin-right: 10px;
    font-size: 30px;
    font-weight: 700;
`

const Gift = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 19px;
`
