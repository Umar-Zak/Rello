import  React from "react";
import styled from "styled-components/native";
import Colors from "../config/Colors";

interface LoyaltyTransactionInterface {
  totalPoints: number
  merchant: string
  date: string
  redeemedPoints: number
}

const LoyaltyTransactionComponent = ({date,merchant,totalPoints, redeemedPoints}: LoyaltyTransactionInterface) => {
    return ( 
        <TransactionTray>
        <SimpleFlex>
        <CompanyName>{merchant}</CompanyName>
        <DateText>{`${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`}</DateText>
        </SimpleFlex>
        <SimpleFlex>
          <TransactionId>Total points</TransactionId>
          <Id>{totalPoints - redeemedPoints}</Id>
        </SimpleFlex>
      </TransactionTray>
     );
}
 
export default LoyaltyTransactionComponent;

const CompanyName = styled.Text`
color: white;
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
 max-width: 800px;
 margin-left: auto;
 margin-right: auto;
 height: 70px;
 border-radius: 10px;
 background: #28c8a4;
 box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10);
 padding: 10px;
 margin-bottom: 20px;
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