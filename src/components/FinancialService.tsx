import  React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

interface FinancialServiceInterface{
    image: ImageSourcePropType
}

const FinancialService = ({image}: FinancialServiceInterface) => {
    return (  
        <Container>
            <Image resizeMode="contain" source={image} />
        </Container>
    );
}
 
export default FinancialService;

const Container = styled.TouchableOpacity`
 width: 150px;
 height: 100px;
 overflow: hidden;
 border-radius: 20px;
 background: white;
 margin-left: 7px;
 margin-right: 7px;
`

const Image = styled.Image`
 width: 100%;
 height: 100%;

`
