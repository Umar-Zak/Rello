import React, { Children } from 'react';
import "styled-components"
import styled from "styled-components/native"
import Colors from '../config/Colors';

interface InputMaskInterface {
    children: React.ReactElement
}
function InputMask({children}: InputMaskInterface) {
    return (
         <Container>
          {children}
         </Container>
    );
}

const Container = styled.View`
position: absolute;
width: 100%;
height: 70%;
bottom: 0;
left: 0;
z-index: 50;
background: white;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
padding-left: 5%;
padding-right: 5%;
padding-top: 30px;
`

export default InputMask;