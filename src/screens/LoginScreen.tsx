import React from 'react';
import "styled-components"
import styled from "styled-components/native"
import * as Yup from "yup"
import InputMask from '../components/InputMask';
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import AppTextInput from "../components/AppTextInput";
import Button from '../components/Button';
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';


const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Email address must be valid")
    .required("Email address is required")
    .label("Email address"),
    password: Yup.string()
    .min(8, "Password should be a minimum of 8 characters")
    .required("Password is required")
    .label("Password")
})

function LoginScreen() {
    return (
     <Container>
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
        email: "",
        password: ""
     }}
     validationSchema={validationSchema}
     onSubmit={values => console.log(values)
     }
     >
     <>
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
           <SubmitButton text='Sign In' />
            <LoginTextContainer>
            <HaveText>Don't have account?</HaveText>
            <Login>
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
export default LoginScreen;