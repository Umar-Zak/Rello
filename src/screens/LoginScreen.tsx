import React, {useState, useContext} from 'react';
import "styled-components"
import styled from "styled-components/native"
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
import RootContext from '../context/RootContext';

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
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const rootContext = useContext<any>(RootContext)
    
  
    
    const handleSignupPress = () => {
        navigation.navigate(Screens.signup)
    }

    const handleLogin = async(body: SiginInPayload) => {
        setIsLoading(true)
        // try {
        //     await Auth.signin(body)
        //     setIsLoading(false)
        //     Alert.alert("Success", "Login successful")
        // } catch (error: any) {
        //     setIsLoading(false)
        //     console.log("Error", error);
        //     Alert.alert(error.response.data.message)
            
        // }
        setTimeout(() => {
            rootContext.setUser(true)
        }, 100)
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
     onSubmit={(values: SiginInPayload) => handleLogin(values)
     }
     >
     <>
      <AppTextInput 
        autoCapitalize='none'
            autoCorrect={false}
            label='Phone number*' 
            name='contact'
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
const Login = styled.TouchableOpacity``
const Tagline = styled.Text`
    color: white;
    width: 80%;
    line-height: 25px;
    font-size: 17px;
    opacity: 0.9;
`
export default LoginScreen;