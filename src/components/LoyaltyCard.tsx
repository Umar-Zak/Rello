import React, {memo} from 'react';
import "styled-components"
import styled from "styled-components/native"
import ExpoFastImage from 'expo-fast-image'
import {useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import { LoyaltyInterface } from '../models/DTOS';

import {selectLoyalty} from "../store/entities/LoyaltySlice"
import Screens from '../navigation/Screens';

function LoyaltyCard(card: LoyaltyInterface & {isInWallet?: boolean}) {
    const dispatch = useDispatch()
    const navigation  = useNavigation()

    const handleLoyaltyCardPressed = () => {
        const params = {...card, type: "loyalty"}
        if(card.isInWallet) return navigation.navigate(Screens.walletDetail as never, params as never)
        
        dispatch(selectLoyalty(card))
        navigation.navigate(Screens.loyaltyDetail as never)
    }

    

    return (
    <Container onPress={handleLoyaltyCardPressed} >
    <ExpoFastImage
        uri={card.image}
        cacheKey={card.image.substring(35)} 
        style={{
            width: "100%",
            height: "100%"
            }} 
        />
    </Container>
    );
}

export default memo(LoyaltyCard);

const Container = styled.TouchableOpacity`
width: 150px;
height: 100px;
border-radius: 15px;
background: #6ec0d6;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
margin-bottom: 30px;
overflow: hidden;
margin-left: 7px;
margin-right: 7px;
`





