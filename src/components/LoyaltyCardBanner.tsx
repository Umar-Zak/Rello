import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import { LoyaltyInterface } from '../models/DTOS';



function LoyaltyCardBanner(card: LoyaltyInterface & {isInWallet?: boolean}) {
  

    return (
         <Image resizeMode="cover" source={{uri: card.image}} />
    );
}

export default LoyaltyCardBanner;



const Image = styled.Image`
    width: 100%;
    height: 250px;
    
`









