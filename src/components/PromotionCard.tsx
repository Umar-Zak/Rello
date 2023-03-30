import * as React from 'react';
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import ExpoFastImage from 'expo-fast-image'
import { useNavigation } from '@react-navigation/native';
import { Promotion } from '../models/DTOS';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import {selectPromotion} from "../store/entities/PromotionSlice"
import Screens from "../navigation/Screens"

const PromotionCard = (promo: Promotion) => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation()


    const handlePromotionPressed = (promotion: Promotion) => {
        dispatch(selectPromotion(promotion) as unknown as AnyAction)
        navigation.navigate(Screens.promotion_details as never)
    }


    return (  
        <Pressable onPress={() => handlePromotionPressed(promo)}>
        <PromoCard>
        <ExpoFastImage
        uri={promo.imageurl}
        cacheKey={promo.imageurl.substring(35)} 
        style={{
        width: "100%",
        height: "100%"
        }} 
        />
    </PromoCard>
    </Pressable>
    );
}
 
export default PromotionCard;

const Pressable = styled.TouchableOpacity`

`
const PromoCard = styled.View`
 width: 150px;
 height: 100px;
 border-radius: 15px;
 background: white;
 margin-bottom: 10px;
 overflow: hidden;
`