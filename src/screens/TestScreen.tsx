import React, {useState} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {useSelector} from "react-redux"
import { GiftCardInterface } from '../models/DTOS';

function TestScreen() {
    let giftCards = useSelector<any, GiftCardInterface[]>((state: any) => state.entities.gift.gifts)
    const [searchText, setSearchText] = useState("")
   
    giftCards = giftCards.filter(giftCard => giftCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
    
    return (
       <Container>
         Testing
       </Container>
    );
}

export default TestScreen;

const Container = styled.Text`
    padding-top: 80px;
`


