import React, {useState} from 'react';
import "styled-components"
import {useSelector} from "react-redux"
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
import Colors from '../config/Colors';
import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from '../models/DTOS';
import DiscountCard from '../components/DiscountCard';
import LoyaltyCard from '../components/LoyaltyCard';
import GiftCard from '../components/GiftCard';
import Activity from '../components/Activity';


const tabs = [
    {
        id: "1",
        value: "Discounts"
    },
    {
        id: "2",
        value: "Loyalties"
    },
    {
        id: "3",
        value: "Gift Cards"
    }
]

function WalletScreen() {
    const subscribedDiscount = useSelector<any, DiscountInterface[]>((state: any) => state.entities.discount.subscribedDiscounts)
    const subscribedGiftCards = useSelector<any, GiftCardInterface[]>((state: any) => state.entities.gift.subscribedGiftCards)
    const subscribedLoyaltyCards = useSelector<any, LoyaltyInterface[]>((state: any) => state.entities.loyalty.subscribedLoyalties)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    
    const [searchText, setSearchText] = useState("")
    const [activeIcon, setActiveIcon] = useState(0)


    return (
        <RootView>
        {isLoading && <Activity/>}
      <Container>
        <SearchField 
        placeholder="Search through your wallet" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
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
           {
            activeIcon === 2 && subscribedDiscount.map((discount, index) => (
                <CardContainer key={index}>
                    <DiscountCard isInWallet={true} {...discount} />
                </CardContainer>
            ))
           }

           {
            activeIcon === 0 && subscribedLoyaltyCards.map((loyalty,index) => (
                <CardContainer key={index}>
                    <LoyaltyCard isInWallet={true} {...loyalty} />
                </CardContainer>
            ))
           }
           {
            activeIcon === 1 && subscribedGiftCards.map((giftCard, index) => (
                <CardContainer key={index} >
                <GiftCard {...giftCard} />
                </CardContainer>
            ))
           }
      </Container>
      </RootView>
    );
}

export default WalletScreen;

const Container = styled.ScrollView`
    flex: 1;
    padding: 20px;
`

const TabsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 40px;
`

const Tab = styled.Text`
    color: #fc4559;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
`

const Touchable = styled.TouchableOpacity`
    
`

const CardContainer = styled.View`
    padding-left: 30px;
    margin-bottom: 30px;
`

const RootView = styled.View`
flex: 1
`
const FlexContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 margin-top: 5px;
 margin-bottom: 30px
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

const icons = [
    {
        text: "Loyalties",
        icon: <MaterialIcons size={35} color={Colors.green} name='loyalty' />
    },
    {
        text: "Gifts",
        icon: <AntDesign size={35} color={Colors.green} name='gift' />
    },
    {
        text: "Discounts",
        icon: <AntDesign size={35} color={Colors.green} name='shoppingcart' />
    }
]
