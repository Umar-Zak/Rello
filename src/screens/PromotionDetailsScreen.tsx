import  React, {useState} from 'react';
import styled from 'styled-components/native';
import ExpoFastImage from 'expo-fast-image'
import {AntDesign} from "@expo/vector-icons"
import {useSelector} from "react-redux"
import * as Yup from "yup"
import { Promotion } from '../models/DTOS';
import { Alert } from 'react-native';
import PromotionService from '../services/PromotionService';
import Map from '../components/Map';
import Form from '../components/Form';
import AppTextInput from '../components/AppTextInput';
import SubmitButton from '../components/SubmitButton';

const validationSchema = Yup.object().shape({
    code: Yup.string()
    .required("Competition code is required")
    .label("Competition code")
})

const PromotionDetailsScreen = () => {
    const selectedPromotion = useSelector<any, Promotion>((state: any) => state.entities.promotion.selectedPromotion)
    const [showingMap, setShowingMap] = useState(false)
  

    const handleCodeSubmit = async(code: string) => {
        try {
            await PromotionService.submitPromotionCode({merchantcode: selectedPromotion.merchantcode, usedcode: code})
            Alert.alert("Success", "Your code is captured successfully")
        } catch (error: any) {
           Alert.alert("Error", error.response.data)
        }
    }
    
    
    return ( 
        <Container>
             {showingMap && <Cancel onPress={() => setShowingMap(false) }>
            <AntDesign name="close" color="red" size={30} />
          </Cancel>}
           { showingMap && <Map companyname={selectedPromotion.contact}/>}
            <ExpoFastImage
            uri={selectedPromotion.imageurl}
            cacheKey={selectedPromotion.imageurl.substring(35)} 
            style={{
            width: "100%",
            height: 260
            }} 
        />
            <ContentContainer>
               <Form 
                initialValues={{
                    code: ""
                }}
                validationSchema={validationSchema}
                onSubmit={values => handleCodeSubmit(values.code)
                }
                isKeyBoardAvoidingNeeded={true}
               >
               <>
               <AppTextInput
                name='code'
                label='Competition code'
                />
                <SubmitButton text='Submit Code' />
               </>
               </Form>
               <DiscriptionView>
                <Description>Description</Description>
                <DescriptionText>{selectedPromotion.detail}</DescriptionText>
                <Description>Contact</Description>
                <DescriptionText>{selectedPromotion.contact}</DescriptionText>
                <Touchable onPress={() => setShowingMap(true) }>
                <ViewUsText>View us on map</ViewUsText>
                </Touchable>
               </DiscriptionView>
            </ContentContainer>
        </Container>
     );
}
 
export default PromotionDetailsScreen;



const Container = styled.ScrollView`
flex: 1;
background: white;
`
const ContentContainer = styled.View`
 padding: 20px;
`

const DiscriptionView = styled.ScrollView`
 width: 100%;
 height: 400px;
 background: white;
 margin-top: -60px;
 border-radius: 10px;
 padding: 20px;
 box-shadow: 0 10px 15px rgba(0, 0, 0, 0.20);
`

const Description = styled.Text`
 font-size: 20px;
 color: rgba(0, 0, 0, 0.8)
 font-weight: 700;
 margin-bottom: 20px;
 margin-top: 10px
`


const DescriptionText = styled.Text`
 width: 80%;
 line-height: 20px;
 color: #444444
`
const ViewUsText = styled.Text`
 font-size: 16px;
 margin-top: 20px;
 color: #fd3a5c
`


const Touchable = styled.TouchableOpacity`
`



const Cancel = styled.TouchableOpacity`
width: 40px;
height: 40px;
position: absolute;
top: 20px;
right: 20px;
z-index: 150;
align-items: center;
justify-content: center;
background: white;
border-radius: 7px;
`