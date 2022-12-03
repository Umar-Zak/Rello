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
                    backgroundColor: activeIcon === index? "#fd4957": "#001528",
                }}>
                {icon.icon}
                <TransactionText>{icon.text}</TransactionText>
                </TransactionIcon>
            ))
        }
         </FlexContainer>
          <SubContainer
           contentContainerStyle={{
            paddingBottom: 80
           }}
          >
          <>
           {
            activeIcon === 1 && subscribedDiscounts.length === 0 && <NoSearchResult/>
           }
           <CardContainer >
           {
            activeIcon === 1 && subscribedDiscounts.map((discount, index) => (
                    <DiscountCard key={index} isInWallet={true} {...discount} />
                
            ))
           }
           </CardContainer>
           </>

          <>
          {
            activeIcon === 0 && subscribedLoyaltyCards.length === 0 && <NoSearchResult/>
          }
           <CardContainer >
          {
            activeIcon === 0 && subscribedLoyaltyCards.map((loyalty,index) => (
                    <LoyaltyCard key={index} isInWallet={true} {...loyalty} />
            ))
           }
             </CardContainer>
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
           
          </SubContainer>
      </Container>
      </RootView>
    );
}

export default WalletScreen;

const Container = styled.View`
    flex: 1;
    padding: 20px;
`
const SubContainer = styled.ScrollView`
 padding-top: 30px;
`




const CardContainer = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-around;
   flex-wrap: wrap;
`

const RootView = styled.View`
flex: 1
`
const FlexContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 margin-top: 5px;
 margin-bottom: 30px;
 background: #001528;
 height: 80px;
 border-radius: 20px;
`

const TransactionIcon = styled.TouchableOpacity`
    width: 50%;
    height: 100%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    `

    const TransactionText = styled.Text`
    margin-top: 5px;
    font-size: 14px;
    color: white;
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
