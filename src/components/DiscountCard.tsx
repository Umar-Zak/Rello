import React from 'react';
import "styled-components"
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import { DiscountInterface } from '../models/DTOS';
import {selectDiscount} from "../store/entities/DiscountSlice"
import {openDiscountModal} from "../store/ui/UI"
function DiscountCard(discount: DiscountInterface) {
    const dispatch = useDispatch()

    const handleDiscountPressed = () => {
        dispatch(selectDiscount(discount))
        dispatch(openDiscountModal())
    }

    return (
        <Container onPress={handleDiscountPressed} >
            <CompanyName>{discount.companyname}</CompanyName>
            <SimpleFlex>
               <Percentage>{discount.percentage}%</Percentage>
               <PercentageText>Off</PercentageText>
            </SimpleFlex>
            <Flex>
                <LastUpate>Last Updated</LastUpate>
                <DateValue>{new Date(discount.updatedAt).getMonth()}/{new Date(discount.updatedAt).getFullYear()}</DateValue>
            </Flex>
        </Container>
    );
}

export default DiscountCard;

const Container = styled.TouchableOpacity`
width: 300px;
border-radius: 15px;
background: ${Colors.deep_green};
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
padding-top: 20px;
padding-left: 25px;
padding-right: 25px;
padding-bottom: 20px;
margin-right: 20px;
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
    margin-top: 10px;
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