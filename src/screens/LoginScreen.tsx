import React, {useEffect, useState} from 'react';
import "styled-components"
import styled from "styled-components/native"
import * as Yup from "yup"
import {useNavigation} from "@react-navigation/native"
import {useFeatureFlag} from "configcat-react"
import Colors from '../config/Colors';
import AppTextInput from "../components/AppTextInput";
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';
import Screens from '../navigation/Screens';
import Auth, { SiginInPayload } from '../services/Auth';
import { Alert } from 'react-native';
import {activateUser} from "../store/auth/AuthSlice"
import {startLoader, stopLoader} from "../store/ui/UI"
import SecureStore from '../models/SecureStore';
import { useAppDispatch} from '../hooks/CustomReduxHooks';
import AuthForm from '../components/AuthForm';


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
    const {value: signUpFlagValue} = useFeatureFlag("signUpFlag", false)
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
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
        const NOT_MESSAGE = "Please allow notifications in your settings for this app in order to log in. Our app depends extensively on it"
        if(!deviceID) return Alert.alert("WARNING", NOT_MESSAGE)
        
        dispatch(startLoader())
        try {
            await Auth.signin(body)
            dispatch(stopLoader())
            dispatch(activateUser())
        } catch (error: any) {
            dispatch(stopLoader())
            Alert.alert("ERROR",error.response.data.message)
        }
    }

    return (
    <AuthForm
     title='Access Your Account'
    >
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
            icon='phone'
            id='phone'
        />
            <AppTextInput 
            secureTextEntry 
            autoCorrect={false} 
            autoCapitalize='none' 
            label='Password*'
            name='password'
            icon='lock'
            id='password'
              />
           <SubmitButton text='Sign In'/>
           { signUpFlagValue && <LoginTextContainer>
            <HaveText>Don't have account?</HaveText>
            <Login onPress={handleSignupPress}>
            <LoginText>Sign up</LoginText>
            </Login>
            </LoginTextContainer>}
            <LoginTextContainer>
            <Login onPress={handleForgotPasswordPressed} >
           
            </Login>
            </LoginTextContainer>
            <Login onPress={handleForgotPasswordPressed}>
            <ForgotPassword>Forgot password</ForgotPassword>
            </Login>
       </>
      </Form>
    </AuthForm>
    );
}



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
    color: #97CBEC ;
    font-size: 17px;
`
const ForgotPassword = styled.Text`
    color: #97CBEC;
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
export default LoginScreen;