import React, {useState} from 'react';
import "styled-components"
import {useSelector} from "react-redux"
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
import Colors from '../config/Colors';
import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from '../models/DTOS';
import DiscountCard from '../components/DiscountCard';
import LoyaltyCard from '../components/LoyaltyCard';
import GiftCard from '../components/GiftCard';


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
   
    
    const [searchText, setSearchText] = useState("")
    const [currentTab, setCurrentTab] = useState(tabs[0].id)

    return (
      <Container>
        <SearchField 
        placeholder="Search through your wallet" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
        <TabsContainer>
           {
            tabs.map((tab, index) => (
                <Touchable onPress={() => setCurrentTab(tab.id)} key={index} >
                <Tab style={{color: tab.id === currentTab ? Colors.green : Colors.dark_grey}} >{tab.value}</Tab>
                </Touchable>
            ))
           }
        </TabsContainer>
           {
            currentTab === tabs[0].id && subscribedDiscount.map((discount, index) => (
                <CardContainer key={index}>
                    <DiscountCard {...discount} />
                </CardContainer>
            ))
           }

           {
            currentTab === tabs[1].id && subscribedLoyaltyCards.map((loyalty,index) => (
                <CardContainer key={index}>
                    <LoyaltyCard {...loyalty} />
                </CardContainer>
            ))
           }
           {
            currentTab === tabs[2].id && subscribedGiftCards.map((giftCard, index) => (
                <CardContainer key={index} >
                    <GiftCard {...giftCard} />
                </CardContainer>
            ))
           }
      </Container>
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