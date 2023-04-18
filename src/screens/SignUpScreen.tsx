import React, {useState, useEffect} from 'react';
import "styled-components"
import styled from "styled-components/native"
import * as Yup from "yup"
import {useSelector, useDispatch} from "react-redux"
import {useNavigation} from "@react-navigation/native"
import Colors from '../config/Colors';
import AppTextInput from "../components/AppTextInput";
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';
import Screens from '../navigation/Screens';
import Auth, { SignUpPayload } from '../services/Auth';
import { Alert } from 'react-native';
import { sendOTP } from '../utils/SmsUtil';
import {startLoader, stopLoader} from "../store/ui/UI"
import {activateUser} from "../store/auth/AuthSlice"
import SecureStore from '../models/SecureStore';
import AuthForm from '../components/AuthForm';

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
    const [otp, setOtp] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const [signUpInfo, setSignUpInfo] = useState<SignUpPayload>()
    const [deviceID, setDeviceID] = useState("")


    useEffect(() => {
        loadDeviceID()
    }, [])
    
    const loadDeviceID = async() => {
        const result = await SecureStore.getDeviceToken() as string
        setDeviceID(result)
    }

    const handleSignInPress = () => {
        navigation.navigate(Screens.login as never)
    }

    const handleSignUp = async (body: SignUpPayload) => {
        dispatch(startLoader())
        setSignUpInfo(body)
        const number = body.contact.substring(1)
        const code = Date.now().toString().substring(7)
        const message = `Your Corral sign up verification code is ${code}`
        setOtp(code)

        try {
            await sendOTP(message, number)
            dispatch(stopLoader())
            setIsAuth(true)
        } catch (error) {
            dispatch(stopLoader())
            Alert.alert("ERROR", "Please enter a valid number")
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
            Alert.alert("ERROR",error.response.data.message)
           }
    }


    return (
        <AuthForm
        title='Create an Account'
        >
            <>
            {!isAuth &&
         <Form
     initialValues={{
        email: "",
        password: "",
        firstname:"",
        lastname:"",
        contact:""
     }}
     validationSchema={validationSchema}
     onSubmit={(values: SignUpPayload) => handleSignUp({...values, deviceID})
     }
     >
        <>
     <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='First name*'  
            name='firstname'
            icon='user'
        />
        <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Last name*'  
            name='lastname'
            icon='user'
        />
        <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Phone number*'  
            name='contact'
            keyboardType='phone-pad'
            icon='phone'
        />
      <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Email*'  
            name='email'
            icon='mail'
        />
            <AppTextInput 
            secureTextEntry 
            autoCorrect={false} 
            autoCapitalize='none' 
            label='Password*'
            name='password'
            icon='lock'
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
      }
     {isAuth &&
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
      }
            </>
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
    color: #97CBEC;
    font-size: 17px;
`
const Login = styled.TouchableOpacity``

export default SignUpScreen;