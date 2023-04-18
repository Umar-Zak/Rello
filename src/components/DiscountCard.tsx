import React, {memo} from "react";
import "styled-components"
import { useDispatch } from "react-redux";
import ExpoFastImage from "expo-fast-image"
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { DiscountInterface } from "../models/DTOS";
import {selectDiscount} from "../store/entities/DiscountSlice"
import Screens from "../navigation/Screens";


function DiscountCard(discount: DiscountInterface & {isInWallet?: boolean}) {
    
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleDiscountPressed = () => {
        const transformedDiscount = {...discount, type: "discount"}
        
        if(discount.isInWallet as boolean) return navigation.navigate(Screens.walletDetail as never, transformedDiscount as never)

        dispatch(selectDiscount(discount))
        navigation.navigate(Screens.discountDetails as never)
    }
   
    
    return (
         <Container 
         onPress={handleDiscountPressed}
         >
        <ExpoFastImage
            uri={discount.image}
            cacheKey={discount?.image?.substring(35)} 
            style={{
            width: "100%",
            height: "100%"
            }} 
        />
        </Container>
    );
}

export default memo(DiscountCard);

const Container = styled.TouchableOpacity`
width: 150px;
height: 100px;
border-radius: 15px;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
margin-bottom: 20px;
overflow: hidden;
margin-left: 7px;
margin-right: 7px;
`

