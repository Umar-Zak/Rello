import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import Colors from "../config/Colors"
interface SubsribeButtonInterface {
    handleSubscribe:() => void
}

function SubscribeButton({handleSubscribe}: SubsribeButtonInterface) {
    return (
        <Subscribe onPress={handleSubscribe}>
                <SubcribeText>Subscribe</SubcribeText>
      </Subscribe>
    );
}

export default SubscribeButton;

const Subscribe = styled.TouchableOpacity`
    width: 130px;
    height: 50px;
    background: ${Colors.green};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 315px;
    right: 10px;
    border-radius: 7px;
    z-index: 100;
`

const SubcribeText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 17px;
`