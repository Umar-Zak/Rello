import React, {useState, useEffect} from 'react';
import { Alert, Animated} from 'react-native'
import  "styled-components"
import { useSelector, useDispatch } from 'react-redux';
import {AntDesign, Entypo} from "@expo/vector-icons"
import styled from 'styled-components/native';
import {closeDiscountModal} from "../store/ui/UI"
import Colors from '../config/Colors';
import { DiscountInterface } from '../models/DTOS';
import Map from './Map';
import SubscribeButton from './SubscribeButton';
import CardDetailsHeader from './CardDetailsHeader';
import CardDetailsLocation from './CardDetailsLocation';

function DiscountModa() {
    const showDiscountModal = useSelector((state: any) => state.ui.showDiscountModal)
    const selectedDiscount = useSelector<any, DiscountInterface>((state: any) => state.entities.discount.selectedDiscount)
   
    
    const dispatch = useDispatch()
    const [discountModalTopOffset] = useState(new Animated.Value(1000))

    useEffect(() => {
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
   
       
       


    return (
        <AnimatedDiscountModal 
        style={{
            top: discountModalTopOffset
        }}
        >
            <Background source={require("../assets/geo.png")} >
            <SubscribeButton handleSubscribe={() => Alert.alert("Subscribing")} />
            <CardDetailsLocation/>
            <CardDetailsHeader 
            title="Discount offered by" 
            name={selectedDiscount?.companyname || ""}
            />
            <DiscountPercentageContainer>
                <DiscountPercentage>{selectedDiscount?.percentage}%</DiscountPercentage>
                <Off>Off</Off>
            </DiscountPercentageContainer>
            </Background>
            <ModalCancel onPress={() => dispatch(closeDiscountModal())} >
             <AntDesign name="closecircle" size={30} color="white" />
            </ModalCancel>
           <Map/>
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


const DiscountPercentageContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 190px;
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


