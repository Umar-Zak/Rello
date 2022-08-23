import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import {Entypo} from "@expo/vector-icons"
function CardDetailsLocation() {
    return (
        <LocationContainer>
        <LocateUs>Locate us below</LocateUs>
        <Entypo name="location-pin" size={30} color="#ff6666" />
    </LocationContainer>
    );
}

export default CardDetailsLocation;

const LocationContainer = styled.View`
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 330px;
    left: 10px;
    z-index: 100;
`

const LocateUs = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
`