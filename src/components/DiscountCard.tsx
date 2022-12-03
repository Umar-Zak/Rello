import React from 'react';
import "styled-components"
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import { DiscountInterface } from '../models/DTOS';
import {selectDiscount} from "../store/entities/DiscountSlice"
import {openDiscountModal} from "../store/ui/UI"
import Screens from '../navigation/Screens';

function DiscountCard(discount: DiscountInterface & {isInWallet?: boolean}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const handleDiscountPressed = () => {
        const transformedDiscount = {...discount, type: "discount"}
        if(discount.isInWallet) return navigation.navigate(Screens.walletDetail as never, transformedDiscount as never)

        dispatch(selectDiscount(discount))
        dispatch(openDiscountModal())
    }
   
    
    return (
       <Pressable onPress={handleDiscountPressed}>
         <Container source={{uri: discount.image}} >
        </Container>
       </Pressable>
    );
}

export default DiscountCard;

const Container = styled.ImageBackground`
width: 150px;
height: 100px;
border-radius: 15px;
background: ${Colors.deep_green};
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
padding-top: 20px;
padding-left: 25px;
padding-right: 25px;
padding-bottom: 20px;
margin-bottom: 20px;
overflow: hidden;
`

const Pressable = styled.TouchableOpacity`
`

const CompanyName = styled.Text`
    color: #fd4957;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
    margin-bottom: 10px;
`

const SimpleFlex = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const PercentageText = styled.Text`
    font-size: 18px;
    color: white;
    font-weight: 700;
`   

const Percentage = styled.Text`
    font-weight: 700;
    font-size: 40px;
    color: ${Colors.green};
    margin-right: 5px;
`

const Flex = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`

const LastUpate = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 17px;
`

const DateValue = styled.Text`
color: white;
font-weight: 500;
font-size: 17px;
`