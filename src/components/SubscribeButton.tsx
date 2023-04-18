import React from "react";
import {TouchableOpacity} from "react-native"
import "styled-components"
import styled from "styled-components/native"
import Colors from "../config/Colors"
interface SubsribeButtonInterface {
    handleSubscribe:() => void
    isSubscribed?:boolean
}

function SubscribeButton({handleSubscribe, isSubscribed}: SubsribeButtonInterface) {
    return (!isSubscribed ?
        <TouchableOpacity onPress={handleSubscribe}>
            <Subscribe>
       <SubcribeText>Subscribe</SubcribeText>
      </Subscribe>
        </TouchableOpacity>
         :
         <Subscribe>
         <SubcribeText>Subscribed</SubcribeText>
        </Subscribe>
    );
}

export default SubscribeButton;

const Subscribe = styled.View`
    width: 130px;
    height: 50px;
    background: ${Colors.green};
    align-items: center;
    justify-content: center;
    border-radius: 7px;
`

const SubcribeText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 17px;
`