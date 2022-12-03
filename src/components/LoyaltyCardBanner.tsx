import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import { LoyaltyInterface } from '../models/DTOS';
import { getLoyaltyBackground } from '../models/StaticContent';


function LoyaltyCardBanner(card: LoyaltyInterface & {isInWallet?: boolean}) {
  

    let imageUrl  = ""
    const flag = card.companyname.toLowerCase().substring(0, 3)
    switch (flag){
        case "ama":
            imageUrl = require("../assets/amari-loyalty.jpg")
            break
            
        case "all":
            imageUrl =  require("../assets/allied-loyalty.png")
            break

        case "goi":
            imageUrl = require("../assets/goil-loyalty.png")
            break
        
        case "max":
            imageUrl = require("../assets/maxmart-loyalty.png")
            break

        case "mel":
            imageUrl = require("../assets/melcom-loyalty.png")
            break

        case "she":
            imageUrl = require("../assets/shell-loyalty.png")
            break
        default:
            imageUrl = getLoyaltyBackground()
    }
   
    

    return (
         <Image resizeMode="cover" source={{uri: card.image}} />
    );
}

export default LoyaltyCardBanner;



const Image = styled.Image`
    width: 100%;
    height: 250px;
    
`









