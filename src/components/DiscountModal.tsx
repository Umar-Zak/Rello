import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native'
import  "styled-components"
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import {AntDesign} from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import {closeDiscountModal} from "../store/ui/UI"
import { UserProfile } from '../services/Auth';
import { DiscountInterface, SubscribedDiscount } from '../models/DTOS';
import {subscribeDiscount} from "../store/entities/DiscountSlice"
import Map from './Map';
import SubscribeButton from './SubscribeButton';
import CardDetailsLocation from './CardDetailsLocation';
import Screens from '../navigation/Screens';
import Activity from './Activity';
import Colors from '../config/Colors';
import DiscountCard from './DiscountCard';
import LocationService from '../services/LocationService';
import DiscountCardBanner from './DiscountCardBanner';



function DiscountModa() {
    const showDiscountModal = useSelector((state: any) => state.ui.showDiscountModal)
    const selectedDiscount = useSelector<any, DiscountInterface>((state: any) => state.entities.discount.selectedDiscount)
    const subscribedDiscounts = useSelector<any, SubscribedDiscount[]>((state: any) => state.entities.discount.subscribedDiscounts)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    const userProfile = useSelector<any, UserProfile>((state: any) => state.auth.userProfile)
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [coordinates, setCoordinates] = useState<{latitude: string, longitude: string}>()
    const dispatch = useDispatch()
    const [discountModalTopOffset] = useState(new Animated.Value(1000))
    
    
    let isFoundInSubscriptions: undefined | SubscribedDiscount = undefined
  
    if(subscribedDiscounts && subscribedDiscounts.length > 0){
        isFoundInSubscriptions = subscribedDiscounts?.find(discount => discount.discountid === selectedDiscount?.id)
    }

    useEffect(() => {
        // loadMerchantLocation()
        if(showDiscountModal){
           Animated.spring(discountModalTopOffset, {
               toValue: 0,
               useNativeDriver: false
           }).start()
        }
   
        else {
           Animated.spring(discountModalTopOffset, {
               toValue: 1000,
               useNativeDriver: false
           }).start()
        }
           
       }, [showDiscountModal])
   
       
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
        dispatch(closeDiscountModal())
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
        <AnimatedDiscountModal 
        style={{
            top: discountModalTopOffset
        }}
        >
           {isLoading && <Activity/>}
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
            </DetailContainer> 
            </ContentContainer>
           </SubContainer>
            <ModalCancel onPress={() => dispatch(closeDiscountModal())} >
             <AntDesign name="closecircle" size={30} color="white" />
            </ModalCancel>
          {/* {coordinates && <Map latitude={coordinates?.latitude} longitude={coordinates?.longitude}  />} */}
        </AnimatedDiscountModal>
    );
}

export default DiscountModa;


const Background = styled.View`
    width: 100%;
    height: 490px;
    background: ${Colors.deep_green}
`

const ContentContainer = styled.ScrollView`
 width: 100%;
 height: 50%;
 border-radius: 10px;
 background: #f6f9fc;
 margin-top: 40px;
 box-shadow: 0 10px 20px rgba(0,0,0, 0.25)
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

const DetailedText = styled.Text`
line-height: 25px;
font-size: 16px;
width: 85%
`

const Details = styled.Text`
    font-weight: 300;
    margin-left: 20px;
    margin-top: 10px;
    width: 250px;
    font-size: 14px
`
const DiscountModal = styled.View`
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    z-index: 100;
    left: 0;
`

const DetailContainer = styled.View`
flex-direction: column;
width: 210px

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


const Pressable = styled.TouchableOpacity`
`
const ReadMore = styled.Text`
margin-top: 10px;
margin-left: 20px
color: #fd4957
`
// const SubContainer = styled.View`
// align-items: center;
// justify-content: center;
// padding-top: 60px
// `

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
const AnimatedDiscountModal = Animated.createAnimatedComponent(DiscountModal)







