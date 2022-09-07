import React from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {useRoute} from "@react-navigation/native"
import QRCode from 'react-native-qrcode-svg';
import Screen from '../components/Screen';
import { DiscountInterface, LoyaltyInterface } from '../models/DTOS';
import DiscountCard from '../components/DiscountCard';
import LoyaltyCard from '../components/LoyaltyCard';



function WalletDetailScreen() {
    const {params} = useRoute()
    const idObject: any = params
    
    return (
       <Container 
       >
        <Screen>
            <>
           {idObject.type === "discount" && <DiscountCard {...params as unknown as DiscountInterface} />}
           {idObject.type === "loyalty" && <LoyaltyCard {...params as unknown as LoyaltyInterface} />}
            <CodesContainer>
            <QRCode size={270} value={idObject.clientcode.toString()} />
            </CodesContainer>
            <ClientId>{idObject.clientcode}</ClientId>
            </>
        </Screen>
       </Container>
    );
}

export default WalletDetailScreen;

const Container = styled.ScrollView`
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px
`

const ClientId = styled.Text`
font-weight: 700;
margin-top: 30px;
font-size: 19px;
text-align: center
`

const CodesContainer = styled.View`
align-items: center;
justify-content: center;
margin-top: 40px
`

