import React from 'react';
import "styled-components"
import styled from 'styled-components/native';
import Colors from '../config/Colors';

interface ButtonInterface {
    text: string
    handleClick: () => void
}

function Button({text, handleClick}: ButtonInterface) {
    return (
         <Container onPress={handleClick} >
            <Text>{text}</Text>
         </Container>
    );
}

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 52px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    background: #97CBEC;
`
const Text = styled.Text`
    color: ${Colors.light};
    font-weight: 600;
    font-size: 20px;
`
export default Button;