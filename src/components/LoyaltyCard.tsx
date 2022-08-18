import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import Colors from '../config/Colors';
import { LoyaltyInterface } from '../models/DTOS';
function LoyaltyCard(card: LoyaltyInterface) {
    return (
    <Container>
        <CompanyName>{card.companyname}</CompanyName>
        <LoyaltyText>Loyalty Amount</LoyaltyText>
        <Amount>{card.amount}.00 Ghc</Amount>
        <Flex>
            <LastUpdate>Last Upated</LastUpdate>
            <DateValue>{card.updatedAt.getMonth()}/{card.updatedAt.getFullYear()}</DateValue>
        </Flex>
    </Container>
    );
}

export default LoyaltyCard;

const Container = styled.TouchableOpacity`
width: 250px;
border-radius: 15px;
background: #6ec0d6;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
padding: 20px;
padding-left: 25px;
padding-right: 25px;
margin-right: 20px;
`

const CompanyName = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 18px;

`

const LoyaltyText = styled.Text`
    margin-top: 14px;
    color: white;
    opacity: 0.9;
    font-weight: 400;
    font-size: 15px;
    margin-bottom: 7px;
`

const Amount = styled.Text`
    color: white;
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
    color: white;
    font-weight: 500;
    font-size: 16px;
`