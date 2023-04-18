import * as React from "react";
import styled from "styled-components/native";
import { DiscountTransaction } from "../models/DTOS";
import Colors from "../config/Colors";
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
color: white;
font-weight: 500;
font-size: 17px
`

const DateText = styled.Text`
font-weight: 400
font-size: 15px;
color: white;
opacity: 0.6
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
 background: #02203c;
 box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10);
 padding: 10px;
 margin-bottom: 20px;
 box-shadow: 0 5px 7px rgba(0, 0, 0, 0.25)
`

const TransactionId = styled.Text`
margin-top: 12px;
font-size: 14px;
color: ${Colors.green}
`

const Id = styled.Text`
margin-top: 12px;
color: #fd4957;
font-size: 12px
`