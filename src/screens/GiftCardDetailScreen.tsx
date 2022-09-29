import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux"
import {AntDesign} from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import "styled-components"
import styled from "styled-components/native"
import CardDetailsLocation from '../components/CardDetailsLocation';
import Map from '../components/Map';
import SubscribeButton from '../components/SubscribeButton';
import { GiftCardInterface } from '../models/DTOS';
import Colors from '../config/Colors';
import {subscribeToGiftCard} from "../store/entities/GiftSlice"
import {startLoader, stopLoader} from "../store/ui/UI"
import Screens from '../navigation/Screens';
import Activity from '../components/Activity';
import GiftCard from '../components/GiftCard';

function GiftCardDetailScreen() {
    const selectedGiftCard = useSelector<any, GiftCardInterface>((state: any) => state.entities.gift.selectedGiftCard)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleSubcribeButtonPressed = () => {
        dispatch(startLoader())
        
        setTimeout(() => {
        dispatch(subscribeToGiftCard(selectedGiftCard))
        dispatch(stopLoader())
        navigation.goBack()
        navigation.navigate(Screens.wallet as never)

        }, 2000)
    }

    const detailsText = `This card offers you 1.00 worth in gift. Terms & conditions apply
    `

    return (
       <Container>
       {isLoading && <Activity/>}
       {isModalVisible && 
           <Modal>
          <ModalCancel onPress={() => setIsModalVisible(false)} >
             <AntDesign name="closecircle" size={30} color="white" />
            </ModalCancel>
            <DetailedText>{detailsText}</DetailedText>
           </Modal>}
        <Background>
         <CardDetailsLocation/>
        <SubscribeButton handleSubscribe={handleSubcribeButtonPressed} />
        <SubContainer>
            <GiftCard {...selectedGiftCard} />
        </SubContainer>
        <CompanyName>{selectedGiftCard.companyname}</CompanyName>
        <Contact>Address: {selectedGiftCard.address}</Contact>
        <DetailHeader>Details</DetailHeader>
        <DetailContainer>
        <Details>{detailsText.substring(0, 40)}...</Details>
        <Pressable onPress={() => setIsModalVisible(true)}>
          {detailsText.length > 40 &&  <ReadMore>Read more</ReadMore>}
            </Pressable>
        </DetailContainer>
        </Background>
        <Map/>
       </Container>
    );
}

export default GiftCardDetailScreen;

const Container = styled.View`
    flex: 1;
`

const CompanyName = styled.Text`
margin-top: 20px;
margin-left: 20px;
font-size: 20px;
color: ${Colors.green};
font-weight: 700;
margin-bottom: 15px

`

const Contact = styled.Text`
    margin-left: 20px;
    color: white;
    font-weight: 500;
    font-size: 17px
`
const DetailHeader = styled.Text`
    color: ${Colors.green};
    margin-left: 20px;
    margin-top: 30px;
    font-size: 18px;
    font-weight: 600
`

const Details = styled.Text`
    font-weight: 300;
    color: white;
    margin-left: 20px;
    margin-top: 10px;
    width: 290px;
    font-size: 14px
`
const SubContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding-top: 20px;
`

const Background = styled.View`
    width: 100%;
    height: 490px;
    background: ${Colors.deep_green}
`


const DetailContainer = styled.View`
flex-direction: column;
width: 210px

`

const ReadMore = styled.Text`
margin-top: 10px;
margin-left: 20px
color: #fd4957
`
const Pressable = styled.TouchableOpacity`
`
const Modal = styled.View`
width: 100%;
height: 490px
background: white;
position: absolute;
left: 0;
top: 0;
z-index: 200;
padding: 20px;
padding-top: 70px
`

const ModalCancel = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 17px;
    align-items: center;
    justify-content: center;
    background: ${Colors.deep_green};
    position: absolute;
    top: 30px;
    right: 10px;
`

const DetailedText = styled.Text`
line-height: 25px;
font-size: 16px;
width: 85%
`