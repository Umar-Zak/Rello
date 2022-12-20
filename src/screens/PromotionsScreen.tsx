import  React, {useState} from 'react';
import {RefreshControl} from "react-native"
import { AnyAction } from 'redux';
import ExpoFastImage from 'expo-fast-image'
import {useSelector, useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
import { Promotion } from '../models/DTOS';
import Screens from "../navigation/Screens"
import {selectPromotion, loadPromotions} from "../store/entities/PromotionSlice"


const PromotionsScreen = () => {
    const [refreshing, setRefreshing] = useState(false)
    const promotions = useSelector<any, Promotion[]>((state: any) => state.entities.promotion.promotions )
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleRefresh = () => {
        setRefreshing(true)
        dispatch(loadPromotions() as unknown as AnyAction)
        setTimeout(() => {
            setRefreshing(false)
        }, 4000)
    }



    const handlePromotionPressed = (promotion: Promotion) => {
        dispatch(selectPromotion(promotion) as unknown as AnyAction)
        navigation.navigate(Screens.promotion_details as never)
    }



    return (
        <Container>
            <SearchField
                handleSearch={() => console.log("searching")}
                placeholder="Search for promotion"
            />
            <SubContainer
            contentContainerStyle={{
                paddingBottom: 80
            }}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                />
            }
            showsVerticalScrollIndicator={false}
            >
                <PromotionsContainer>
               {
                promotions.map((promo, index) => (
                <Pressable key={index} onPress={() => handlePromotionPressed(promo)}>
                <PromotionCard>
                <ExpoFastImage
                uri={promo.imageurl}
                cacheKey={promo.imageurl.substring(35)} 
                style={{
                width: "100%",
                height: "100%"
                }} 
                />
        </PromotionCard>
        </Pressable>
                ))
               }
               
                </PromotionsContainer>
            </SubContainer>
        </Container>
    )
}
 
export default PromotionsScreen;

const Container = styled.View`
 flex: 1;
 padding: 20px;
`
const Pressable = styled.TouchableOpacity`

`
const PromotionCard = styled.View`
 width: 150px;
 height: 100px;
 border-radius: 15px;
 background: white;
 margin-bottom: 10px;
 overflow: hidden;
`

const PromotionsContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 flex-wrap: wrap;
`

const SubContainer = styled.ScrollView`
 padding-top: 50px;
`

