import React from 'react';
import  'styled-components';
import styled from "styled-components/native"
import {useFormikContext} from "formik"
import Colors from '../config/Colors';


type autoCapt = "none" | "sentences" | "characters" | "words"
type keyType = "default" | "email-address" | "number-pad" | "decimal-pad" | "numeric" | "url" | "phone-pad"

interface TextFieldInterface  {
    label: string
    keyboardType?: keyType
    secureTextEntry?: boolean
    autoCapitalize?: autoCapt
    autoCorrect?: boolean
    name: string
}
function AppTextInput({label, name ,...rest}: TextFieldInterface) {
    const {values, setFieldValue, errors, touched} = useFormikContext<{[name: string]: string}>()
    return (
       <Container>
        <Label>{label}</Label>
        <InputField 
         {...rest}
         value={values[name]}
         onChangeText={(value: string) => setFieldValue(name, value)}
         />
     { touched[name] && errors[name] &&  <Error>{errors[name]}</Error>}
       </Container>
    );
}

const Container = styled.View`
width: 100%;
margin-bottom: 25px;

`

const Error = styled.Text`
    color: red;
    margin-top: 5px;
    font-size: 13px;
    margin-left: 3px;
`
const InputField = styled.TextInput`
width: 100%;
padding-block: 5px;
padding-left: 15px;
padding-right: 15px;
background: ${Colors.grey};
height: 52px;
border-radius: 7px;
color: ${Colors.dark_grey};
font-size: 15px;
`

const Label = styled.Text`
margin-bottom: 10px;
color: ${Colors.dark_grey};
font-size: 18px;
`

export default AppTextInput;