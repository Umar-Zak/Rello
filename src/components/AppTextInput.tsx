import React from "react";
import  "styled-components";
import styled from "styled-components/native"
import {useFormikContext} from "formik"
import {Entypo} from "@expo/vector-icons"
import Colors from "../config/Colors";


// Type inference on line 36 was just done to
// stop the typescript compiler from yelling.
// It has no other sepcial benefits.
//If you're reading this comment, then it means
// I haven't found a better way yet. Feel free to improve it.

type autoCapt = "none" | "sentences" | "characters" | "words"
type keyType = "default" | "email-address" | "number-pad" | "decimal-pad" | "numeric" | "url" | "phone-pad"

interface TextFieldInterface  {
    label: string
    keyboardType?: keyType
    secureTextEntry?: boolean
    autoCapitalize?: autoCapt
    autoCorrect?: boolean
    name: string
    height?: number
    numberOfLines?:number
    multiline?: boolean
    icon?: string
    id?: string
}
function AppTextInput({label, name ,height,icon,id,...rest}: TextFieldInterface) {
    const {values, setFieldValue, errors, touched} = useFormikContext<{[name: string]: string}>()
    return (
       <Container>
        <Label>{label}</Label>
        <InputGroup style={{height: (height !== undefined && height !== null)? height: 52}}>
        {icon && <Entypo name={icon as "map"} size={25} color="#97CBEC" />}
        <InputField 
        style={{
            height: (height !== undefined && height !== null)? height : 52
        }}
         testID={(id !== undefined && id !== null)? id : ""}
         {...rest}
         value={values[name]}
         onChangeText={(value: string) => setFieldValue(name, value)}
         />
        </InputGroup>
     { touched[name] && errors[name] &&  <Error>{errors[name]}</Error>}
       </Container>
    );
}

const Container = styled.View`
width: 100%;
margin-bottom: 25px;
max-width: 600px;
margin-left:auto;
margin-right: auto;
`

const Error = styled.Text`
    color: red;
    margin-top: 5px;
    font-size: 13px;
    margin-left: 3px;
`
const InputField = styled.TextInput`
margin-left: 15px;
color: ${Colors.dark_grey};
font-size: 15px;
width: 80%
`

const InputGroup = styled.View`
width: 100%;
padding-block: 5px;
padding-left: 20px;
padding-right: 20px;
height: 52px;
border-radius: 30px;
border: 1px solid #97CBEC;
flex-direction: row;
align-items: center;
`

const Label = styled.Text`
margin-bottom: 10px;
color: ${Colors.dark_grey};
font-size: 18px;
`

export default AppTextInput;