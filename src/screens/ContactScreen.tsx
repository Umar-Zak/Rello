import * as React from 'react';
import styled from 'styled-components/native';
import {Feather, Entypo} from "@expo/vector-icons"
import * as Yup from "yup"
import Colors from '../config/Colors';
import Form from '../components/Form';
import AppTextInput from '../components/AppTextInput';
import SubmitButton from '../components/SubmitButton';
import { ContactPayload } from '../models/DTOS';
import Activity from '../components/Activity';
import { startLoader, stopLoader } from '../store/ui/UI';
import { AnyAction } from 'redux';
import { Alert } from 'react-native';
import ContactService from '../services/ContactService';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Email must be valid")
    .required("Email is required")
    .label("Email"),
    contact: Yup.string()
    .required("Contact is required")
    .label("Contact"),
    title: Yup.string()
    .required("Message title is required")
    .label("Message title"),
    message: Yup.string()
    .required("Message is required")
    .label("Message")

})


const ContactScreen = () => {
   const dispatch = useAppDispatch()
   const isLoading = useAppSelector(({ui}) => ui.isLoading)

    const handleFormSubmission = async(body: ContactPayload) => {
     dispatch(startLoader() as unknown as AnyAction)
     try {
        await ContactService.submitContactForm(body)
        dispatch(stopLoader() as unknown as AnyAction)
        Alert.alert("Message Received", "We will get back to you soon")
     } catch (error) {
        dispatch(stopLoader() as unknown as AnyAction)
        Alert.alert("Error", "Unexpected error occurred")
     }
     
    }

    return ( 
          <Container>
            { isLoading && <Activity/>}
            <SubContainer
            contentContainerStyle={{
                paddingBottom: 30
            }}
            >
                <Title>Contact Us</Title>
                <ContactTag>
                    <Feather name="mail" size={25} color={Colors.green} />
                    <ContactText>infocorralmerchant@gmail.com</ContactText>
                </ContactTag>
                <ContactTag>
                    <Feather name="phone" size={25} color={Colors.green} />
                    <ContactText>+233577665099</ContactText>
                </ContactTag>
                <ContactTag>
                    <Entypo name="location-pin" size={25} color={Colors.green} />
                    <ContactText>Ring Road Accra</ContactText>
                </ContactTag>
                <ContactContainer>
                <Form
                 initialValues={{
                    email: "",
                    contact: "",
                    title: "",
                    message: ""
                 }}
                 validationSchema={validationSchema}
                 onSubmit={(values: ContactPayload) => handleFormSubmission(values)
                 }
                >
                    <>
                    <AppTextInput 
                    label='Email'
                    name="email" 
                    keyboardType='email-address'
                    />
                    <AppTextInput 
                    label='Contact'
                    name="contact" 
                    keyboardType='number-pad'
                    />
                    <AppTextInput 
                    label='Title'
                    name="title" 
                    />
                    <AppTextInput 
                    label='Message'
                    name="message" 
                    height={150}
                    numberOfLines={5}
                    multiline={true}
                    />
                    <SubmitButton text='Submit' />
                    </>
                </Form>
                </ContactContainer>
            </SubContainer>
        </Container>
     );
}
 
export default ContactScreen;

const Container = styled.SafeAreaView`
 flex: 1
`

const SubContainer = styled.ScrollView`
 padding-left: 20px;
 padding-right: 20px;
 padding-top: 20px;
`

const Title = styled.Text`
 color: ${Colors.deep_green}
 font-size: 20px;
 margin-top: 30px;
 margin-bottom: 15px;
 font-weight: 700;
 text-transform: capitalize;
 letter-spacing: 1px;
`


const ContactTag = styled.View`
flex-direction: row;
align-items: center;
margin-top: 20px;
`

const ContactText = styled.Text`
 margin-left: 20px;
 font-size: 16px;
`

const ContactContainer = styled.View`
 margin-top: 50px;
`