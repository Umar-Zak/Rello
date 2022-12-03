import  React, {useState} from 'react';
import styled from 'styled-components/native';
import {useSelector} from "react-redux"
import {Entypo} from "@expo/vector-icons"
import { Promotion } from '../models/DTOS';
import Colors from '../config/Colors';
import { Alert } from 'react-native';
import PromotionService from '../services/PromotionService';
const PromotionDetailsScreen = () => {
    const selectedPromotion = useSelector<any, Promotion>((state: any) => state.entities.promotion.selectedPromotion)
    const [code, setCode] = useState("")

  

    const handleCodeSubmit = async() => {
        if(!code) return Alert.alert("Invalid Action", "Please enter a promotion code")
        try {
            await PromotionService.submitPromotionCode({merchantcode: selectedPromotion.merchantcode, usedcode: code})
            setCode("")
            Alert.alert("Success", "You code is captured successfully")
        } catch (error: any) {
           Alert.alert("Error", error.response.data)
          
            
        }
       
    }
    
    return ( 
        <Container>
            <Banner source={{uri: selectedPromotion.imageurl}} />
            <ContentContainer>
               <InputGroup>
               <InputField onChangeText={(text: string) => setCode(text)} value={code} placeholder="Text your code" />
               <Pressable onPress={handleCodeSubmit}>
                <Entypo name="arrow-bold-right" size={45} color={Colors.green}/>
               </Pressable>
               </InputGroup>
               <DiscriptionView>
                <Description>Description</Description>
                <DescriptionText>{selectedPromotion.detail}</DescriptionText>
               </DiscriptionView>
            </ContentContainer>
        </Container>
     );
}
 
export default PromotionDetailsScreen;



const Banner = styled.Image`
width: 100%;
height: 40%;
`
const Container = styled.View`
flex: 1
`
const ContentContainer = styled.View`
 padding: 20px;
`

const InputGroup = styled.View`
 flex-direction: row;
 align-items: center;
`
const InputField = styled.TextInput`
 width: 70%;
 height: 45px;
 background: #d4dcdf;
 border-radius: 7px;
 margin-right: 20px;
 padding: 10px;
 font-size: 16px;
 color: ${Colors.deep_green}
`

const Pressable = styled.TouchableOpacity`

`

const DiscriptionView = styled.ScrollView`
 width: 100%;
 height: 40%;
 background: #d4dcdf;
 border-radius: 10px;
 margin-top: 30px;
 padding: 20px;
`

const Description = styled.Text`
 font-size: 20px;
 color: ${Colors.deep_green}
 font-weight: 700;
 margin-bottom: 20px;
`


const DescriptionText = styled.Text`
 width: 80%;
 line-height: 20px;
`