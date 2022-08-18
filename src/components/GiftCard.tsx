import React from 'react';
import { StyleSheet } from 'react-native'
import "styled-components"
import styled from 'styled-components/native';
import {LinearGradient} from "expo-linear-gradient"
import { getGradients } from '../config/Colors';
import { GiftCardInterface } from '../models/DTOS';

function GiftCard(giftCard: GiftCardInterface) {
    return (
       <Container>
         <LinearGradient
         colors={getGradients()}
         style={styles.container}
      >
        <CompanyName>{giftCard.companyname}</CompanyName>
        <SimpleFlex>
            <CardValue>Card Value</CardValue>
            <Value>{giftCard.count}.00 Ghc</Value>
        </SimpleFlex>
        <LastUpdated>Last Updated</LastUpdated>
        <DateValue>{giftCard.updatedAt.getUTCMonth()}/{giftCard.updatedAt.getFullYear()}</DateValue>
      </LinearGradient>
       </Container>
    );
}

export default GiftCard;


const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        paddingVertical: 15,
       paddingHorizontal: 20,
       width: 300
    }
})

const Container = styled.TouchableOpacity`
    margin-right: 20px;
`

const CompanyName = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 20px;
`
const SimpleFlex = styled.View`
    flex-direction: row;
    align-items: center;
    color: white;
`

const CardValue = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 15px;
    margin-right: 15px;
    opacity: 0.8;
`

const Value = styled.Text`
color: white;
font-weight: 700;
font-size: 20px;
`

const LastUpdated = styled.Text`
    color: white;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 10px;
`

const DateValue = styled.Text`
    color: white;
    font-weight: 700;
`