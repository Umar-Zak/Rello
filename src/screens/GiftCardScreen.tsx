import React, {useState} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {useSelector} from "react-redux"
import GiftCard from '../components/GiftCard';
import NoSearchResult from '../components/NoSearchResult';
import SearchField from '../components/SearchField';
import { GiftCardInterface } from '../models/DTOS';
function GiftCardScreen() {
    let giftCards = useSelector<any, GiftCardInterface[]>((state: any) => state.entities.gift.gifts)
    const [searchText, setSearchText] = useState("")
   
    giftCards = giftCards.filter(giftCard => giftCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
    
    return (
       <Container>
        <SearchField 
        placeholder="Search gift cards"
        handleSearch={(text) => setSearchText(text)
        }
         />
         {
            giftCards.map((giftCard, index) => (
               <GiftContainer key={index}>
                 <GiftCard  {...giftCard} />
               </GiftContainer>
            ))
         }
         {
            (giftCards.length === 0) && <NoSearchResult/>
         }
       </Container>
    );
}

export default GiftCardScreen;

const Container = styled.ScrollView`
    padding: 20px;
`

const GiftContainer = styled.View`
    margin-bottom: 30px;
    margin-left: 30px;
`