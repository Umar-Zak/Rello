import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import Colors from "../config/Colors"

interface CardDetailsHeaderInterface {
    title: string
    name: string
}
function CardDetailsHeader({name, title}: CardDetailsHeaderInterface) {
    return (
        <CompanyContainer>
        <DiscountBy>{title}</DiscountBy>
        <CompanyName>{name}</CompanyName>
    </CompanyContainer>
    );
}

export default CardDetailsHeader;


const CompanyContainer = styled.View`
    position: absolute;
    top: 70px;
    padding-left: 15px;
    z-index: 100;
`

const DiscountBy = styled.Text`
    color: ${Colors.deep_green};
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
`

const CompanyName = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 19px;
`