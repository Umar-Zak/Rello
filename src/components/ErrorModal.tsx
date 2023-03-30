import * as React from 'react';
import styled from 'styled-components/native';
import  Constants  from 'expo-constants';
import {AntDesign} from "@expo/vector-icons"
import {useDispatch} from "react-redux"
import {hideErrorModal} from "../store/ui/UI"
import { AnyAction } from 'redux';
import Colors from '../config/Colors';
import { useAppDispatch } from '../hooks/CustomReduxHooks';
const ErrorModal = ({message}: {message: string}) => {
    
    const dispatch = useAppDispatch()

    return (  
        <Container>
            <CancelIcon onPress={() => dispatch(hideErrorModal() as any as AnyAction)}>
                <AntDesign name="close" size={30} color="white" />
            </CancelIcon>
            <Message>{message}</Message>
        </Container>
    );
}
 
export default ErrorModal;

const Container = styled.View`
     width:90%;
     height:60px;
     align-items:center;
     justify-content:center;
     position:absolute;
     top:${Constants.statusBarHeight + 50}px;
     z-index:100;
     background: #001528;
     margin-left: 5%;
     border: 1px solid ${Colors.green};
     border-radius: 5px
`

const Message = styled.Text`
    color: white;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
`
const CancelIcon = styled.TouchableOpacity`
 width: 30px;
 height: 30px;
 position: absolute;
 right: 10px;
 top: 15px;
 align-items: center;
 justify-content: center;
`