import React, {useState, useEffect} from "react"
import {groupBy} from "lodash"
import {Animated, Dimensions } from "react-native"
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import styled from "styled-components/native"
import Colors from "../config/Colors"
import {closeTransModal} from "../store/ui/UI"
import NoSearchResult from "./NoSearchResult"
import DiscountTransactionComponent from "./DiscountTransaction"
import LoyaltyTransactionComponent from "./LoyaltyTransactionComponent"
import {calculateAccumulatedPointsPerMerchant, calculateRedeemedPointsPerMerchants, groupLoTransaction } from "../utils/Common"
import { useAppDispatch, useAppSelector } from "../hooks/CustomReduxHooks"

const {height} = Dimensions.get("screen")

export const TransactionsModal = () => {
    const [left] = useState(new Animated.Value(2000))
    const dispatch = useAppDispatch()

    const showTransactionsModal = useAppSelector((state)=> state.ui.showTransactionsModal) 
    const discountTransactions = useAppSelector((state) => state.entities.discount.discountTransactions) 
    const loyaltyTransactions = useAppSelector((state) => state.entities.loyalty.loyaltyTransactions) 
    const redeemedLoyalties = useAppSelector((state) => state.entities.loyalty.redeemedLoyalties) 
    
    
    
    const groupedLoyaltyTransactions = groupLoTransaction(loyaltyTransactions)
   
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
    
  <ContentView>
  <RootView showsVerticalScrollIndicator={false}>
   
    <Title>Your transactions</Title>
    <FlexContainer>
        {
            icons.map((icon, index) => (
                <TransactionIcon 
                onPress={() => setActiveIcon(index)}
                key={index}
                style={{
                    backgroundColor: activeIcon === index? Colors.green: "black",
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
   
  </ContentView>
  <CloseIcon onPress={() => dispatch(closeTransModal())}>
    <AntDesign name="close" size={30} color={Colors.green} />
    </CloseIcon>
   </AnimatedContainer>
  )
 }


 const icons = [
    {
        text: "Loyalties",
        icon: <MaterialIcons size={35} color="white" name='loyalty' />
    },
    {
        text: "Discounts",
        icon: <AntDesign size={35} color="white" name='gift' />
    },
]


const RootView = styled.ScrollView`
flex: 1
`

const ContentView = styled.View`
height: ${(height / 5) * 4}px;
background: white;
padding: 20px;
border-bottom-left-radius: 40px;
border-bottom-right-radius: 40px;
`

const Container = styled.View`
  width: 100%;
  height: ${height}px;
  background: white;
  position: absolute;
  top: 0;
  z-index: 100;
  background-color: #0b0d33;
  align-items: center;
`
const CloseIcon = styled.TouchableOpacity`
 width: 40px;
 height: 40px;
 border-radius: 25px;
 background: white;
 justify-content: center;
 align-items: center;
 margin-top: 30px;
`
const FlexContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 margin-top: 40px;
 background: #001528;
 height: 80px;
 border-radius: 20px
`

const TransactionIcon = styled.TouchableOpacity`
    width: 50%;
    height: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10)
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    `

    const TransactionText = styled.Text`
    margin-top: 5px;
    font-size: 12px;
    color: white;
    `

const AnimatedContainer = Animated.createAnimatedComponent(Container)


const Title = styled.Text`
    margin-top: 50px;
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${Colors.deep_green};
    text-align: center;

`

const TransactionContainer = styled.View`
 margin-top: 50px;

`


