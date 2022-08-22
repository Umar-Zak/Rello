import React, {useState, useEffect} from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native'
import  "styled-components"
import { useSelector, useDispatch } from 'react-redux';
import {AntDesign, Entypo} from "@expo/vector-icons"
import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import {closeDiscountModal} from "../store/ui/UI"
import Colors from '../config/Colors';
import * as Location from "expo-location"
import { DiscountInterface } from '../models/DTOS';
function DiscountModa() {
    const showDiscountModal = useSelector((state: any) => state.ui.showDiscountModal)
    const selectedDiscount = useSelector<any, DiscountInterface>((state: any) => state.entities.discount.selectedDiscount)
   
    
    const dispatch = useDispatch()
    const [discountModalTopOffset] = useState(new Animated.Value(1000))
    const [coords, setCoords] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    useEffect(() => {
        getCurrentLocation()
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
   
       
       const getCurrentLocation = async() => {
         const {coords: data} = await Location.getCurrentPositionAsync()
         setCoords({
            latitude: data.latitude,
            longitude: data.longitude
         })
         
         
       }


    return (
        <AnimatedDiscountModal 
        style={{
            top: discountModalTopOffset
        }}
        >
            <Background source={require("../assets/geo.png")} >
            <SubscribeButton>
                <SubcribeText>Subscribe</SubcribeText>
            </SubscribeButton>
            <LocationContainer>
                <LocateUs>Locate us below</LocateUs>
                <Entypo name="location-pin" size={30} color="#ff6666" />
            </LocationContainer>
            <CompanyContainer>
                <DiscountBy>Discount offered by</DiscountBy>
                <CompanyName>{selectedDiscount.companyname}</CompanyName>
            </CompanyContainer>
            <DiscountPercentageContainer>
                <DiscountPercentage>{selectedDiscount.percentage}%</DiscountPercentage>
                <Off>Off</Off>
            </DiscountPercentageContainer>
            </Background>
            <ModalCancel onPress={() => dispatch(closeDiscountModal())} >
             <AntDesign name="closecircle" size={30} color="white" />
            </ModalCancel>
            <MapView
             style={styles.map}
             initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              />
        </AnimatedDiscountModal>
    );
}

export default DiscountModa;

const Background = styled.ImageBackground`
    width: 100%;
    height: 380px;
`
const DiscountModal = styled.ScrollView`
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    z-index: 100;
    left: 0;
`

const ModalCancel = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 17px;
    align-items: center;
    justify-content: center;
    background: ${Colors.deep_green};
    position: absolute;
    top: 50px;
    right: 20px;
`


const AnimatedDiscountModal = Animated.createAnimatedComponent(DiscountModal)


const SubscribeButton = styled.TouchableOpacity`
    width: 130px;
    height: 50px;
    background: ${Colors.green};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 315px;
    right: 10px;
    border-radius: 7px;
`

const SubcribeText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 17px;
`

const LocationContainer = styled.View`
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 330px;
    left: 10px;
`

const LocateUs = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
`

const CompanyContainer = styled.View`
    margin-top: 70px;
    padding-left: 15px;
`

const DiscountBy = styled.Text`
    color: ${Colors.deep_green};
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
`

const CompanyName = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 19px;
`

const DiscountPercentageContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`

const DiscountPercentage = styled.Text`
    color: ${Colors.green};
    margin-right: 10px;
    font-size: 35px;
    font-weight: 700;
`

const Off = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 19px;
`

const styles =StyleSheet.create({
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    }
})
