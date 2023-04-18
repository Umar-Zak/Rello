import * as React from "react";
import styled from "styled-components/native";
import { AnyAction } from "redux";
import ExpoFastImage from "expo-fast-image"
import { ProductAuth} from "../models/DTOS";
import { useAppDispatch} from "../hooks/CustomReduxHooks";
import {selectBrand} from "../store/entities/ProductAuthSlice"
import { showVerificationModal } from "../store/ui/UI";

const BrandCard = (brand: ProductAuth) => {

    const dispatch = useAppDispatch()


    const handleBrandPressed = (brand: ProductAuth) => {
        dispatch(selectBrand(brand) as unknown as AnyAction)
        dispatch(showVerificationModal() as unknown as AnyAction)
    }


    return (  
        <Pressable onPress={() => handleBrandPressed(brand)}>
        <Card>
        <ExpoFastImage
        uri={brand.imageurl}
        cacheKey={brand.imageurl.substring(35)} 
        style={{
        width: "100%",
        height: "100%"
        }} 
        />
    </Card>
    </Pressable>
    );
}
 
export default BrandCard;

const Pressable = styled.TouchableOpacity`

`
const Card = styled.View`
 width: 150px;
 height: 100px;
 border-radius: 15px;
 background: white;
 margin-bottom: 10px;
 overflow: hidden;
 margin-left: 7px;
 margin-right: 7px;
`