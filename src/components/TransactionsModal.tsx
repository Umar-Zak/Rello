import React, {useState, useEffect} from 'react'
import {groupBy} from "lodash"
import {Animated, } from "react-native"
import {useDispatch, useSelector} from "react-redux"
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import styled from 'styled-components/native'
import Colors from '../config/Colors'
import {closeTransModal} from "../store/ui/UI"
import { DiscountTransaction, LoyalRedemption, LoyaltyTransaction } from '../models/DTOS'
import NoSearchResult from './NoSearchResult'
import DiscountTransactionComponent from './DiscountTransaction'
import LoyaltyTransactionComponent from './LoyaltyTransactionComponent'
import { calculateAccumulatedPointsPerMerchant, calculateRedeemedPointsPerMerchants } from '../utils/Common'


export const TransactionsModal = () => {
    const [left] = useState(new Animated.Value(2000))
    const dispatch = useDispatch()
    const showTransactionsModal = useSelector<any, boolean>((state): any => state.ui.showTransactionsModal) 
    const discountTransactions = useSelector<any, DiscountTransaction[]>((state): any => state.entities.discount.discountTransactions) 
    const loyaltyTransactions = useSelector<any, LoyaltyTransaction[]>((state): any => state.entities.loyalty.loyaltyTransactions) 
    const redeemedLoyalties = useSelector<any, LoyalRedemption[]>((state): any => state.entities.loyalty.redeemedLoyalties) 
    
    
    const groupedLoyaltyTransactions = groupBy(loyaltyTransactions, (trans) => trans.companyname)
    const merchants = Object.keys(groupedLoyaltyTransactions)
    

    const groupedLoyaltyRedemptions = groupBy(redeemedLoyalties || [], (trans) => trans.merchant.companyname)
    
    

    
    const [activeIcon, setActiveIcon] = useState(0)
    useEffect(() => {
        if(showTransactionsModal){
            Animated.spring(left, {toValue: 0, useNativeDriver: false}).start()
        }

        else {
            Animated.spring(left, {toValue: 2000, useNativeDriver: false}).start()
        }
    }, [showTransactionsModal])


  return (
   <AnimatedContainer style={{
    left: left
   }}>
    
   <RootView showsVerticalScrollIndicator={false}>
   <CloseIcon onPress={() => dispatch(closeTransModal())}>
    <AntDesign name="close" size={30} color="white" />
    </CloseIcon>
    <Title>Your transactions</Title>
    <FlexContainer>
        {
            icons.map((icon, index) => (
                <TransactionIcon 
                onPress={() => setActiveIcon(index)}
                key={index} 
                style={{
                    borderColor: activeIcon === index? "#fd4957": "",
                    borderWidth: activeIcon === index? 1: 0
                }}>
                {icon.icon}
                <TransactionText>{icon.text}</TransactionText>
                </TransactionIcon>
            ))
        }
    </FlexContainer>
   {activeIcon === 1 && <TransactionContainer>
   {discountTransactions.length == 0 && <NoSearchResult text="You haven't made any transactions yet" />}
        {
            discountTransactions.map((trans, index) => (
           <DiscountTransactionComponent key={index} {...trans} />
            ))
        }
    </TransactionContainer>}

    {activeIcon === 0 && <TransactionContainer>
   {loyaltyTransactions.length == 0 && <NoSearchResult text="You haven't made any transactions yet" />}
       {
        merchants.map((merchant, index) => (
            <LoyaltyTransactionComponent 
            merchant={merchant} 
            totalPoints={calculateAccumulatedPointsPerMerchant(groupedLoyaltyTransactions[merchant])} 
            key={index}
            date={groupedLoyaltyTransactions[merchant][0].createdAt}
            redeemedPoints={calculateRedeemedPointsPerMerchants(groupedLoyaltyRedemptions[merchant])}
             />
        ))
       }
        
    </TransactionContainer>}
   </RootView>
   </AnimatedContainer>
  )
 }


 const icons = [
    {
        text: "Loyalties",
        icon: <MaterialIcons size={35} color={Colors.green} name='loyalty' />
    },
    {
        text: "Discounts",
        icon: <AntDesign size={35} color={Colors.green} name='gift' />
    },
]


const RootView = styled.ScrollView`
flex: 1
`

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  z-index: 100;
  padding: 20px;
`
const CloseIcon = styled.TouchableOpacity`
 position: absolute;
 top: 40px;
 right: 10px;
 width: 40px;
 height: 40px;
 border-radius: 15px;
 background: ${Colors.deep_green}
 justify-content: center;
 align-items: center;
`
const FlexContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 margin-top: 40px;
`

const TransactionIcon = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10)
    align-items: center;
    justify-content: center;
    `

    const TransactionText = styled.Text`
    margin-top: 5px;
    font-size: 12px
    `

const AnimatedContainer = Animated.createAnimatedComponent(Container)


const Title = styled.Text`
    margin-top: 90px;
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${Colors.deep_green}

`

const TransactionContainer = styled.View`
 margin-top: 50px
`


