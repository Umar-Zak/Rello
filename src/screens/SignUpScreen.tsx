import React, {useState} from 'react';
import "styled-components"
import styled from "styled-components/native"
import * as Yup from "yup"
import {useSelector, useDispatch} from "react-redux"
import {useNavigation} from "@react-navigation/native"
import InputMask from '../components/InputMask';
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import AppTextInput from "../components/AppTextInput";
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';
import Screens from '../navigation/Screens';
import Auth, { SignUpPayload } from '../services/Auth';
import Activity from '../components/Activity';
import { Alert } from 'react-native';
import { sendOTP } from '../utils/SmsUtil';
import {startLoader, stopLoader} from "../store/ui/UI"
import {activateUser} from "../store/auth/AuthSlice"

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Email address must be valid")
    .required("Email address is required")
    .label("Email address"),
    password: Yup.string()
    .min(8, "Password should be a minimum of 8 characters")
    .required("Password is required")
    .label("Password"),
    firstname: Yup.string()
    .required("First name is required")
    .label("First name"),
    lastname: Yup.string()
    .required("Last name is required")
    .label("Last name"),
    contact: Yup.string()
    .matches(/[0-9]{10}/, "Phone number must be a valid number")
    .max(10, "Phone number must be 10 digits")
    .required("Phone number is required")
    .label("Phone number")
})

const validateOtp = Yup.object().shape({
    otp: Yup.string().required("OTP is required").label("OTP")
})

function SignUpScreen() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const [otp, setOtp] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const [signUpInfo, setSignUpInfo] = useState<SignUpPayload>()

    const handleSignInPress = () => {
        navigation.navigate(Screens.login as never)
    }

    const handleSignUp = async (body: SignUpPayload) => {
        dispatch(startLoader())
        setSignUpInfo(body)
        const number = body.contact.substring(1)
        const code = Date.now().toString().substring(9)
        const message = `Your Rello sign up verification code is ${code}`
        setOtp(code)

        try {
            await sendOTP(message, number)
            dispatch(stopLoader())
            setIsAuth(true)
        } catch (error) {
            dispatch(stopLoader())
            Alert.alert("Error", "Please enter a valid number")
        }
        
    }

    const handleVerification = async(body: {otp: string}) => {
        if(body.otp !== otp) return Alert.alert("Error", "Invalid OTP")
        
        dispatch(startLoader())

        try {
            await Auth.signup({...signUpInfo as SignUpPayload, name: `${signUpInfo?.firstname}  ${signUpInfo?.lastname}`})
            dispatch(stopLoader())
            dispatch(activateUser())
           } catch (error: any) {
            dispatch(startLoader())
            Alert.alert(error.response.data.message)
           }
    }


    return (
     <Container>
       {isLoading && <Activity/>}
         <Screen>
        <>
        <TextContainer>
            <Title>Create account</Title>
            <Tagline>Sign up and start shopping</Tagline>
        </TextContainer>
        
        </>
      </Screen>
     {!isAuth && <InputMask>
   <Form
     initialValues={{
        email: "",
        password: "",
        firstname:"",
        lastname:"",
        contact:""
     }}
     validationSchema={validationSchema}
     onSubmit={(values: SignUpPayload) => handleSignUp(values)
     }
     >
        <>
     <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='First name*'  
            name='firstname'
        />
        <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Last name*'  
            name='lastname'
        />
        <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Phone number*'  
            name='contact'
        />
      <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Email*'  
            name='email'
        />
            <AppTextInput 
            secureTextEntry 
            autoCorrect={false} 
            autoCapitalize='none' 
            label='Password*'
            name='password'
              />
           <SubmitButton text='Sign Up' />
            <LoginTextContainer>
            <HaveText>Already have account?</HaveText>
            <Login onPress={handleSignInPress}>
            <LoginText>Sign In</LoginText>
            </Login>
            </LoginTextContainer>
            </>
     </Form>
      </InputMask>}
     {isAuth && <InputMask>
      <Form
      initialValues={{
        otp: ""
      }}
      validationSchema={validateOtp}
      onSubmit={(values: {otp: string}) => handleVerification(values)
      }
      >
       <>
       <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='OTP*'  
            name='otp'
        />
        <SubmitButton text='Verify' />
       </>
      </Form>
      </InputMask>}
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
    font-weight: 600;
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
const Login = styled.TouchableOpacity``
const Tagline = styled.Text`
    color: white;
    width: 80%;
    line-height: 25px;
    font-size: 17px;
    opacity: 0.8;
`
export default SignUpScreen;