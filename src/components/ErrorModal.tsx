import * as React from 'react';
import styled from 'styled-components/native';
import  Constants  from 'expo-constants';
const ErrorModal = ({message}: {message: string}) => {
    return (  
        <Container>
            <Message>{message}</Message>
        </Container>
    );
}
 
export default ErrorModal;

const Container = styled.View`
     width:100%;
     height:60px;
     align-items:center;
     justify-content:center;
     position:absolute;
     top:${Constants.statusBarHeight}px;
     z-index:100;
     background: #fd4957;
`

const Message = styled.Text`
    color: white;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
`