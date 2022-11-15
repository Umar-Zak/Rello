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
import NoSearchResult from '../components/NoSearchResult';
import Overlay from '../components/Overlay';


 

function WalletScreen() {
    let subscribedDiscounts = useSelector<any, DiscountInterface[]>((state: any) => state.entities.discount.subscribedDiscounts)
    let subscribedGiftCards = useSelector<any, GiftCardInterface[]>((state: any) => state.entities.gift.subscribedGiftCards)
    let subscribedLoyaltyCards = useSelector<any, LoyaltyInterface[]>((state: any) => state.entities.loyalty.subscribedLoyalties)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    
    const [searchText, setSearchText] = useState("")
    const [activeIcon, setActiveIcon] = useState(0)
    
    
    switch (activeIcon) {
        case 0:
            subscribedLoyaltyCards = subscribedLoyaltyCards.filter(loyaltyCard => loyaltyCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            break
        case 1:
            subscribedDiscounts = subscribedDiscounts.filter(discountCard => discountCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            break
        case 2:
            subscribedGiftCards = subscribedGiftCards.filter(giftCard => giftCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            break
        
        default:
            subscribedLoyaltyCards = subscribedLoyaltyCards.filter(loyaltyCard => loyaltyCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            
    }
    

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
           <>
           {
            activeIcon === 1 && subscribedDiscounts.length === 0 && <NoSearchResult/>
           }
           {
            activeIcon === 1 && subscribedDiscounts.map((discount, index) => (
                <CardContainer key={index}>
                    <DiscountCard isInWallet={true} {...discount} />
                </CardContainer>
            ))
           }
           </>

          <>
          {
            activeIcon === 0 && subscribedLoyaltyCards.length === 0 && <NoSearchResult/>
          }
          {
            activeIcon === 0 && subscribedLoyaltyCards.map((loyalty,index) => (
                <CardContainer key={index}>
                    <LoyaltyCard isInWallet={true} {...loyalty} />
                </CardContainer>
            ))
           }
          </>
           <>
           {
            activeIcon === 2 && subscribedGiftCards.length === 0 && <NoSearchResult/>
           }
           {
            activeIcon === 2 && subscribedGiftCards.map((giftCard, index) => (
                <CardContainer key={index} >
                <GiftCard {...giftCard} />
                </CardContainer>
            ))
           }
           </>
           <Overlay/>
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
    // {
    //     text: "Gifts",
    //     icon: <AntDesign size={35} color={Colors.green} name='gift' />
    // },
    {
        text: "Discounts",
        icon: <AntDesign size={35} color={Colors.green} name='shoppingcart' />
    }
]
