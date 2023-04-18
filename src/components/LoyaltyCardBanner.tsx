import React from "react";
import "styled-components"
import ExpoFastImage from "expo-fast-image"
import { LoyaltyInterface } from "../models/DTOS";



function LoyaltyCardBanner(card: LoyaltyInterface & {isInWallet?: boolean}) {
  

    return (
        <ExpoFastImage
        uri={card.image}
        cacheKey={card.image.substring(35)} 
        style={{
            width: "100%",
            height: 250
            }} 
        />
    );
}

export default LoyaltyCardBanner;













