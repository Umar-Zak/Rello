import * as React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { DiscountTransaction } from '../models/DTOS';
import Colors from '../config/Colors';
const DiscountTransactionComponent = (trans: DiscountTransaction) => {
    return ( 
        <TransactionTray>
        <SimpleFlex>
        <CompanyName>{trans.companyname}</CompanyName>
        <DateText>{new Date(trans.createdAt).getDate()}/{new Date(trans.createdAt).getMonth()+ 1}/{new Date(trans.createdAt).getFullYear()}</DateText>
        </SimpleFlex>
        <SimpleFlex>
          <TransactionId>Transaction ID</TransactionId>
          <Id>{trans.id}</Id>
        </SimpleFlex>
      </TransactionTray>
     );
}
 
export default DiscountTransactionComponent;

const CompanyName = styled.Text`
color: ${Colors.green}
font-weight: 500;
font-size: 17px
`

const DateText = styled.Text`
font-weight: 400
font-size: 15px;
color: ${Colors.deep_green}
`

const SimpleFlex = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`

const TransactionTray = styled.View`
 width: 100%;
 height: 70px;
 border-radius: 10px;
 background: white;
 box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10);
 padding: 10px;
 margin-bottom: 20px;
 border: 1px solid ${Platform.OS === "android"? "#fd4957": "white"}
`

const TransactionId = styled.Text`
margin-top: 12px;
font-size: 14px
`

const Id = styled.Text`
margin-top: 12px;
color: #fd4957;
font-size: 12px
`