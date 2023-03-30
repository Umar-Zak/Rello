import React, {useState, useEffect} from 'react';
import  "styled-components"
import { AnyAction } from 'redux';
import { useNavigation } from '@react-navigation/native';
import {AntDesign} from "@expo/vector-icons"
import styled from 'styled-components/native';
import {SubscribedDiscount } from '../models/DTOS';
import {subscribeDiscount} from "../store/entities/DiscountSlice"
import Map from '../components/Map';
import SubscribeButton from '../components/SubscribeButton';
import Screens from '../navigation/Screens';
import Activity from '../components/Activity';
import Colors from '../config/Colors';
import LocationService from '../services/LocationService';
import DiscountCardBanner from '../components/DiscountCardBanner';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';



function DiscountDetailsScreen() {
    const dispatch = useAppDispatch()
    const selectedDiscount = useAppSelector(({entities: {discount}}) => discount.selectedDiscount)
    const subscribedDiscounts = useAppSelector(({entities: {discount}}) => discount.subscribedDiscounts)
    const isLoading = useAppSelector(({ui}) => ui.isLoading)
    const userProfile = useAppSelector(({auth}) => auth.userProfile)
    const navigation = useNavigation()
    const [coordinates, setCoordinates] = useState<{latitude: string, longitude: string}>()
 
    const [showingMap, setShowingMap] = useState(false)
    
    let isFoundInSubscriptions: undefined | SubscribedDiscount = undefined
  
    if(subscribedDiscounts && subscribedDiscounts.length > 0){
        isFoundInSubscriptions = subscribedDiscounts?.find(discount => discount.discountid === selectedDiscount?.id)
    }

    useEffect(() => {
        // loadMerchantLocation()
       }, [])
   
       
       
       

       const handleDiscountSubscribtion = async () => {
       const payload: SubscribedDiscount = {
        merchantcode: selectedDiscount.merchantcode,
        clientcode:   userProfile.contact,
        companyname:  selectedDiscount.companyname,
        address:      selectedDiscount.address,
        discountype:  selectedDiscount.discountype,
        percentage:   selectedDiscount.percentage,
        discountid:   selectedDiscount.id,
        image: selectedDiscount.image
       }

        dispatch(subscribeDiscount(payload) as unknown as AnyAction)
        navigation.goBack()
        navigation.navigate(Screens.wallets as never)
        
       }


       const loadMerchantLocation = async () => {
         if(selectedDiscount){
            try {
                const result = await LocationService.getMerchantCoordinate(selectedDiscount?.companyname)
                setCoordinates(result[0])
            } catch (error) {
                console.log(error)
            }
         }
            
       }


    return (
        <DiscountModal 
        contentContainerStyle={{
            paddingBottom: 30
        }}
        >
           {isLoading && <Activity/>}
          {showingMap &&<Map companyname={selectedDiscount.companyname} />}
         {showingMap && <Cancel onPress={() => setShowingMap(false) }>
            <AntDesign name="close" color="red" size={30} />
          </Cancel>}
            <DiscountCardBanner {...selectedDiscount}/>
           <SubContainer>
           <HeadersContainer>
            <CompanyName>{selectedDiscount.companyname}</CompanyName>
            <SubscribeButton handleSubscribe={handleDiscountSubscribtion} isSubscribed={isFoundInSubscriptions? true : false} />
            </HeadersContainer>
            <ContentContainer>
            <DetailHeader>Details</DetailHeader>
            <DetailContainer>
            <Details>{selectedDiscount.details}</Details>
            <DetailHeader>Contact us</DetailHeader>
            <Details>{selectedDiscount.contacts}</Details>
          <Touchable onPress={() => setShowingMap(true) }>
          <ViewUsText>View us on map</ViewUsText>
          </Touchable>
            </DetailContainer> 
            </ContentContainer>
           </SubContainer>
        </DiscountModal>
    );
}



export default DiscountDetailsScreen;



const ContentContainer = styled.View`
 width: 100%;
 height: 400px;
 border-radius: 10px;
 background: white;
 margin-top: -10px;
`

const CompanyName = styled.Text`
margin-top: 20px;
margin-left: 20px;
font-size: 17px;
color: ${Colors.deep_green};
font-weight: 700;
margin-bottom: 50px;
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
    width: 250px;
    font-size: 14px
    color: #444444
`
const DiscountModal = styled.ScrollView`
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    z-index: 100;
    left: 0;
`

const DetailContainer = styled.View`
flex-direction: column;
width: 210px;
height: 400px;
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
top: 20px;
right: 20px;
z-index: 150;
align-items: center;
justify-content: center;
background: white;
border-radius: 7px;
`
