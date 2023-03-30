import React, {useState, useEffect} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {AntDesign} from "@expo/vector-icons"
import Map from '../components/Map';
import SubscribeButton from '../components/SubscribeButton';
import Colors from '../config/Colors';
import {createSubscription} from "../store/entities/LoyaltySlice"
import Screens from '../navigation/Screens';
import Activity from '../components/Activity';
import { AnyAction } from 'redux';
import LocationService from '../services/LocationService';
import { Alert } from 'react-native';
import LoyaltyCardBanner from '../components/LoyaltyCardBanner';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';

function LoyaltyCardDetailsScreen() {
    const dispatch = useAppDispatch()
    const selectedLoyalty = useAppSelector(({entities: {loyalty}}) => loyalty.selectedLoyalty)
    const subscribedLoyaltyCards = useAppSelector(({entities: {loyalty}}) => loyalty.subscribedLoyalties)
    const isLoading = useAppSelector(({ui}) => ui.isLoading)
    const userProfile = useAppSelector(({auth}) => auth.userProfile)
    const navigation = useNavigation()
    const [coordinates, setCoordinates] = useState<{latitude: string, longitude: string}>()
    const isFoundInSubscription = subscribedLoyaltyCards.find(subs => subs.loyaltyid === selectedLoyalty.id)
    const [showingMap, setShowingMap] = useState(false)
    
    
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
       <Container 
       contentContainerStyle
       =
       {{
        paddingBottom: 30
       }}>
        {isLoading && <Activity/>}
        { showingMap && <Map companyname={selectedLoyalty.companyname} />}
        { showingMap && <Cancel onPress={() => setShowingMap(false)}>
            <AntDesign name="close" size={30} color="red" />
        </Cancel>}
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
        <DetailHeader>Contact</DetailHeader>
        <Details>{selectedLoyalty.contact}</Details>
       <Touchable onPress={() => setShowingMap(true)}>
        <ViewUsText>View us on map</ViewUsText>
       </Touchable>
        </DetailContainer> 
      </ContentContainer>
      </SubContainer>
       </Container>
    );
}

export default LoyaltyCardDetailsScreen;

const Container = styled.ScrollView`
    flex: 1;
    background: white;
`
const ContentContainer = styled.View`
 width: 100%;
 height: 400px;
 border-radius: 10px;
 background: white;
 margin-top: -10px;
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
margin-bottom: 50px
width: 55%;
line-height: 24px;
`

const DetailHeader = styled.Text`
    color: rgba(0, 0, 0, 0.8);
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
    color: #444444
`

const DetailContainer = styled.View`
flex-direction: column;
width: 210px;
`

const ViewUsText = styled.Text`
 font-size: 16px;
 margin-left: 20px;
 margin-top: 20px;
 color: #fd3a5c
`


const Touchable = styled.TouchableOpacity`
`



const Cancel = styled.TouchableOpacity`
width: 40px;
height: 40px;
position: absolute;
top: 10px;
right: 20px;
z-index: 150;
align-items: center;
justify-content: center;
background: white;
border-radius: 7px;
`