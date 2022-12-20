import React, {useState, useEffect} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {AntDesign} from "@expo/vector-icons"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import Map from '../components/Map';
import SubscribeButton from '../components/SubscribeButton';
import { LoyaltyInterface, SubsribedLoyalty} from '../models/DTOS';
import Colors from '../config/Colors';
import {createSubscription} from "../store/entities/LoyaltySlice"
import Screens from '../navigation/Screens';
import Activity from '../components/Activity';
import { UserProfile } from '../services/Auth';
import { AnyAction } from 'redux';
import LoyaltyCard from '../components/LoyaltyCard';
import LocationService from '../services/LocationService';
import { Alert } from 'react-native';
import LoyaltyCardBanner from '../components/LoyaltyCardBanner';

function LoyaltyCardDetailsScreen() {
    const selectedLoyalty = useSelector<any, LoyaltyInterface>((state: any) => state.entities.loyalty.selectedLoyalty)
    const subscribedLoyaltyCards = useSelector<any, SubsribedLoyalty[]>((state: any) => state.entities.loyalty.subscribedLoyalties)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const userProfile = useSelector<any, UserProfile>((state: any) => state.auth.userProfile)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [coordinates, setCoordinates] = useState<{latitude: string, longitude: string}>()
    const isFoundInSubscription = subscribedLoyaltyCards.find(subs => subs.loyaltyid === selectedLoyalty.id)

    useEffect(() => {
        // loadCoordinates()
    }, [])
  
  
    const loadCoordinates = async () => {
        try {
            if(selectedLoyalty){
              const result = await LocationService.getMerchantCoordinate(selectedLoyalty.companyname)
              setCoordinates(result[0])
            }
        } catch (error) {
            Alert.alert("ERROR", "Error loading location coordinates")
        }
    }

    const handleSubscribeButtonPressed = () => {
    const payload = {
     merchantcode: selectedLoyalty.merchantcode,
     clientcode: userProfile.contact,
     companyname: selectedLoyalty.companyname,
     address: selectedLoyalty.address,
     amount: selectedLoyalty.amount,
     point: selectedLoyalty.point,
     loyaltyid: selectedLoyalty.id,
     image: selectedLoyalty.image
    }
    dispatch(createSubscription(payload) as unknown as AnyAction)
    navigation.goBack()
    navigation.navigate(Screens.wallets as never)
    }

    
    return (
       <Container>
        {isLoading && <Activity/>}
            <LoyaltyCardBanner {...selectedLoyalty} />
      <SubContainer>
      <HeadersContainer>
      <CompanyName>{selectedLoyalty.companyname}</CompanyName>
      <SubscribeButton 
       isSubscribed={isFoundInSubscription? true: false}
        handleSubscribe={handleSubscribeButtonPressed
        } 
        />
      </HeadersContainer>
      <ContentContainer>
      <DetailHeader>Details</DetailHeader>
        <DetailContainer>
        <Details>{selectedLoyalty.details}</Details>
        </DetailContainer> 
      </ContentContainer>
      </SubContainer>
       </Container>
    );
}

export default LoyaltyCardDetailsScreen;

const Container = styled.View`
    flex: 1;
`
const ContentContainer = styled.ScrollView`
 width: 100%;
 height: 50%;
 border-radius: 10px;
 background: #f9fffd;
 margin-top: 40px;
 box-shadow: 0 10px 20px rgba(0,0,0, 0.25)
`

const SubContainer = styled.View`
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
`

const HeadersContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`

const CompanyName = styled.Text`
margin-top: 20px;
margin-left: 20px;
font-size: 17px;
color: ${Colors.deep_green};
font-weight: 700;
margin-bottom: 15px
width: 55%;
line-height: 24px;

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
    margin-left: 20px;
    margin-top: 10px;
    width: 290px;
    font-size: 14px;
    line-height: 20px;
`

const DetailContainer = styled.View`
flex-direction: column;
width: 210px;
`