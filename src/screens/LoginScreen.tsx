import React, {useEffect, useState} from 'react';
import "styled-components"
import styled from "styled-components/native"
import {useDispatch, useSelector} from "react-redux"
import * as Yup from "yup"
import {useNavigation} from "@react-navigation/native"
import InputMask from '../components/InputMask';
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import AppTextInput from "../components/AppTextInput";
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';
import Screens from '../navigation/Screens';
import Auth, { SiginInPayload } from '../services/Auth';
import { Alert } from 'react-native';
import Activity from '../components/Activity';
import {activateUser} from "../store/auth/AuthSlice"
import {startLoader, stopLoader} from "../store/ui/UI"
import SecureStore from '../models/SecureStore';


const validationSchema = Yup.object().shape({
    contact: Yup.string()
    .matches(/[0-9]{10}/,"Phone number must be a 10 digit number")
    .max(10, "Phone number must not be more than 10 digits")
    .required("Phone number is required")
    .label("Phone number"),
    password: Yup.string()
    .min(8, "Password should be a minimum of 8 characters")
    .required("Password is required")
    .label("Password")
})

function LoginScreen() {
    const navigation =useNavigation()
    const dispatch = useDispatch()
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const [deviceID, setDeviceID] = useState("")
    
    
    useEffect(() => {
        loadDeviceID()
    }, [])
    
    const loadDeviceID = async () => {
        const result = await SecureStore.getDeviceToken() as string
        setDeviceID(result)

    }
    
    const handleSignupPress = () => {
        navigation.navigate(Screens.signup as never)
    }

    const handleForgotPasswordPressed = () => {
        navigation.navigate(Screens.forgotPassword as never)
    }

    const handleLogin = async(body: SiginInPayload) => {
        dispatch(startLoader())
        try {
            await Auth.signin(body)
            dispatch(stopLoader())
            dispatch(activateUser())
        } catch (error: any) {
            console.log("res err",error.response.data);
            
            dispatch(stopLoader())
            Alert.alert(error.response.data.message)
        }
    }

    return (
     <Container>
       {isLoading && <Activity/>}
         <Screen>
        <>
        <TextContainer>
            <Title>Sign in to your account</Title>
            <Tagline>Sign in to start shopping</Tagline>
        </TextContainer>
        
        </>
      </Screen>
      <InputMask>
     <Form
     initialValues={{
        contact: "",
        password: ""
     }}
     validationSchema={validationSchema}
     onSubmit={(values: SiginInPayload) => handleLogin({...values, deviceID})
     }
     >
     <>
      <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Phone number*' 
            name='contact'
            keyboardType='phone-pad'
        />
            <AppTextInput 
            secureTextEntry 
            autoCorrect={false} 
            autoCapitalize='none' 
            label='Password*'
            name='password'
              />
           <SubmitButton text='Sign In'/>
            <LoginTextContainer>
            <HaveText>Don't have account?</HaveText>
            <Login onPress={handleSignupPress}>
            <LoginText>Sign up</LoginText>
            </Login>
            </LoginTextContainer>
            <LoginTextContainer>
            <Login onPress={handleForgotPasswordPressed} >
           
            </Login>
            </LoginTextContainer>
            <Login onPress={handleForgotPasswordPressed}>
            <ForgotPassword>Forgot password</ForgotPassword>
            </Login>
      </>
     </Form>
     
      </InputMask>
     </Container>
    );
}

const Container = styled.View`
flex: 1;
background: ${Colors.deep_green};
`
const TextContainer = styled.View`
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 20px;
`
const Title = styled.Text`
    color: white;
    margin-bottom: 14px;
    font-size: 26px;
    font-weight: 700;
`

const LoginTextContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 15%;
    padding-left: 10%;
    padding-right: 10%;
`
const HaveText = styled.Text`
    font-size:16px ;
    color: ${Colors.dark_grey};
`
const LoginText = styled.Text`
    color: ${Colors.green};
    font-size: 17px;
`
const ForgotPassword = styled.Text`
    color: ${Colors.green};
    font-size: 17px;
    margin-top: -40px;
    text-align: center;
`
const Login = styled.TouchableOpacity``
const Tagline = styled.Text`
    color: white;
    width: 80%;
    line-height: 25px;
    font-size: 17px;
    opacity: 0.9;
`

const Pressable = styled.TouchableOpacity`
`
export default LoginScreen;