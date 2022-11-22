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
import { sendOTP } from '../utils/SmsUtil';


const validationSchema = Yup.object().shape({
    contact: Yup.string()
    .matches(/[0-9]{10}/,"Phone number must be a 10 digit number")
    .max(10, "Phone number must not be more than 10 digits")
    .required("Phone number is required")
    .label("Phone number")
})

const validateOTP = Yup.object().shape({
    otp: Yup.string()
    .required("OTP code is required")
    .label("OTP")
})

const validatePassword = Yup.object().shape({
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required")
    .label("New Password")
})

function ForgotPasswordScreen() {
    const navigation =useNavigation()
    const dispatch = useDispatch()
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const [deviceID, setDeviceID] = useState("")
    const [otp, setOtp] = useState("")
    const [contact, setContact] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    
    
    useEffect(() => {
        loadDeviceID()
    }, [])
    
    const loadDeviceID = async () => {
        const result = await SecureStore.getDeviceToken() as string
        setDeviceID(result)

    }

    const handleLoginPress = () => {
        navigation.navigate(Screens.login as never)
    }
   

    const handleVerify = async (body: {contact: string}) => {
        dispatch(startLoader())
        const code = Date.now().toString().substring(7)
        const message = `Your device verification code is ${code}`
        try {
            const result = await Auth.findUserByContact(body)
            setContact(result.contact)
            await sendOTP(message,result.contact.substring(1))
            setOtp(code)
            dispatch(stopLoader())
        } catch (error: any) {
            console.log("ERRor",error.response);
            
            dispatch(stopLoader())
            if(error.response.status === 400) {
                Alert.alert("ERROR", "This number is not registered")
            }
        }
    }


    const verifyOTP = async (input: string) => {
        if(input !== otp) return Alert.alert("ERROR", "Invalid OTP")

        setIsVerified(true)
    }


    const handleResetPassword = async(newPassword: string) => {
        dispatch(startLoader())
        try {
            await Auth.resetUserPassword({password: newPassword, contact, deviceID})
            dispatch(stopLoader())
            dispatch(activateUser())
        } catch (error) {
            dispatch(stopLoader())
            Alert.alert("ERROR", "Unexpected error")
        }
    }

    return (
     <Container>
       {isLoading && <Activity/>}
         <Screen>
        <>
        <TextContainer>
            <Title>Forgot Password</Title>
            <Tagline>Verify your phone number</Tagline>
        </TextContainer>
        </>
      </Screen>
      <InputMask>
    <>
   {!otp && <Form
     initialValues={{
        contact: ""
     }}
     validationSchema={validationSchema}
     onSubmit={(values: {contact: string}) => handleVerify(values)
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
           <SubmitButton text='Verify Number'/>
           <LoginTextContainer>
            <Login onPress={handleLoginPress}>
            <LoginText>Login</LoginText>
            </Login>
            </LoginTextContainer>
      </>
     </Form>}

     {!isVerified && otp && <Form
     initialValues={{
        otp: ""
     }}
     validationSchema={validateOTP}
     onSubmit={(values: {otp: string}) => verifyOTP(values.otp)
     
     }
     >
     <>
      <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='OTP*' 
            name='otp'
        />
           <SubmitButton text='Verify OTP'/>
           <LoginTextContainer>
            <Login onPress={handleLoginPress}>
            <LoginText>Login</LoginText>
            </Login>
            </LoginTextContainer>
      </>
     </Form>}

     {isVerified && <Form
     initialValues={{
        password: ""
     }}
     validationSchema={validatePassword}
     onSubmit={(values: {password: string}) => handleResetPassword(values.password)
     
     }
     >
     <>
      <AppTextInput 
        autoCapitalize='none'
        autoCorrect={false}
        label='New Password*' 
        name='password'
        secureTextEntry
        />
           <SubmitButton text='Reset Password'/>
           <LoginTextContainer>
            <Login onPress={handleLoginPress}>
            <LoginText>Login</LoginText>
            </Login>
            </LoginTextContainer>
      </>
     </Form>}
    </>
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
    margin-top: 40px;
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
    margin-top: -20px;
`
const Login = styled.TouchableOpacity``
const Tagline = styled.Text`
    color: white;
    width: 80%;
    line-height: 25px;
    font-size: 17px;
    opacity: 0.9;
`
export default ForgotPasswordScreen;