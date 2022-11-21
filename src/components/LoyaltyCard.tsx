import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import {useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import Colors from '../config/Colors';
import { LoyaltyInterface } from '../models/DTOS';
import { getLoyaltyBackground } from '../models/StaticContent';
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

    let imageUrl  = ""
    const flag = card.companyname.toLowerCase().substring(0, 3)
    switch (flag){
        case "ama":
            imageUrl = require("../assets/amari-loyalty.jpg")
            break
            
        case "all":
            imageUrl =  require("../assets/allied-loyalty.png")
            break

        case "goi":
            imageUrl = require("../assets/goil-loyalty.png")
            break
        
        case "max":
            imageUrl = require("../assets/maxmart-loyalty.png")
            break

        case "mel":
            imageUrl = require("../assets/melcom-loyalty.png")
            break

        case "she":
            imageUrl = require("../assets/shell-loyalty.png")
            break
        default:
            imageUrl = getLoyaltyBackground()
    }
   
    

    return (
    <Container onPress={handleLoyaltyCardPressed} >
         <Image resizeMode="cover" source={imageUrl} />
         {/* <Overflow/>
        <ContentContainer>
        <CompanyName>{card.companyname}</CompanyName>
        <LoyaltyText>Loyalty Amount</LoyaltyText>
        <Amount>{card.amount}.00 Ghc</Amount>
        <Flex>
            <LastUpdate>Last Upated</LastUpdate>
            <DateValue>{new Date(card.updatedAt).getMonth()}/{new Date(card.updatedAt).getFullYear()}</DateValue>
        </Flex>
        </ContentContainer> */}
    </Container>
    );
}

export default LoyaltyCard;

const Container = styled.TouchableOpacity`
width: 250px;
height: 160px;
border-radius: 15px;
background: #6ec0d6;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
margin-bottom: 30px;
overflow: hidden;
margin-right: 20px;
`
const ContentContainer = styled.View`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
z-index: 40;
padding: 10px;
padding-left: 20px;
padding-right: 20px;
`

const CompanyName = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 18px;

`

const Image = styled.Image`
    width: 100%;
    height: 100%;
  
`

const Overflow = styled.View`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
`

const LoyaltyText = styled.Text`
    margin-top: 14px;
    color: white;
    font-weight: 400;
    font-size: 15px;
    margin-bottom: 7px;
`

const Amount = styled.Text`
    color: ${Colors.green};
    font-weight: 700;
    font-size: 22px;
`

const Flex = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`

const LastUpdate = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 16px;
`

const DateValue = styled.Text`
    color: ${Colors.green};
    font-weight: 500;
    font-size: 16px;

`



