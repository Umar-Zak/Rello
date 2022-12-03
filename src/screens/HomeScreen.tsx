import React, {useState, useEffect} from 'react';
import { Animated, Platform} from 'react-native'
import "styled-components"
import styled from 'styled-components/native';
import {useDispatch, useSelector} from "react-redux"
import {MaterialIcons} from "@expo/vector-icons"
import { AnyAction } from 'redux';
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import DiscountModa from '../components/DiscountModal';
import {loadUserProfile, logoutUser} from "../store/auth/AuthSlice"
import Auth, { UserProfile } from '../services/Auth';
import Activity from '../components/Activity';
import {loadDiscountCards, loadSubscribedDiscounts, loadDiscountTransactions} from "../store/entities/DiscountSlice"
import {loadGiftCards} from "../store/entities/GiftSlice"
import {loadLoyaltyCards, loadSubscribedLoyalties, loadLoyaltyTransactions} from "../store/entities/LoyaltySlice"
import {showTransModal, showMenu, showGraph} from "../store/ui/UI"
import { TransactionsModal } from '../components/TransactionsModal';
import Service from '../components/Service';
import Screens from '../navigation/Screens';
import MenuComponent from '../components/Menu';
import TransactionsChart from '../components/TransactionsCharts';
import { loadPromotions } from '../store/entities/PromotionSlice';

function HomeScreen() {
    // const discounts = useSelector<any, DiscountInterface[]>((state: any) => state.entities.discount.discounts)
    // const loyalties = useSelector<any, LoyaltyInterface[]>((state: any) => state.entities.loyalty.loyalties)
    const isLoading = useSelector<any, boolean>((state: any) => state.ui.isLoading)
    
    const userProfile = useSelector<any, UserProfile>((state: any) => state.auth.userProfile)
    
    const [top] = useState(new Animated.Value(-2000))
    const dispatch = useDispatch()
  

    useEffect(() => {
        dispatch(loadUserProfile() as unknown as AnyAction)
        dispatch(loadDiscountCards() as unknown as AnyAction)
        dispatch(loadGiftCards() as unknown as AnyAction)
        dispatch(loadLoyaltyCards() as unknown as AnyAction)
        dispatch(loadSubscribedDiscounts() as unknown as AnyAction)
        dispatch(loadSubscribedLoyalties() as unknown as AnyAction)
        dispatch(loadDiscountTransactions() as unknown as AnyAction)
        dispatch(loadLoyaltyTransactions() as unknown as AnyAction)
        dispatch(loadPromotions() as unknown as AnyAction)
    }, [])

    const handleAvatarPressed = () => {
        dispatch(showMenu() as unknown as AnyAction)
    }

    

   
 
    return (
       <Root>
         <TransactionsModal/>
        {isLoading && <Activity/>}
        <MenuComponent/>
        <TransactionsChart/>
        <Header>
          <Pressable onPress={handleAvatarPressed} >
          <MaterialIcons name="account-circle"  size={40} color={Colors.dark_grey}/>
          </Pressable>
            <Home>Home</Home>
            <MenuIcon onPress={() => dispatch(showGraph())} >
            <MaterialIcons name="menu"  size={40} color={Colors.dark_grey}/>
            </MenuIcon>
        </Header>
        {!isLoading && <Container
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{
            paddingBottom: 80
        }}
        >
        <Screen>
            <SubContainer>
             <ServiceContainer>
             <Service 
             redirectUrl={Screens.discount}
             title="Discount cards" 
             image={require("../assets/Corral_Discount_.png")} 
             />
             <Service 
             redirectUrl={Screens.loyalty}
             title="Loyalty cards" 
             image={require("../assets/Corral_Loyalty.png")}
             />
             </ServiceContainer>
             <ServiceContainer>
             <Service 
             redirectUrl={Screens.promo}
             title="Promotions" 
             image={require("../assets/boy.png")} />
             <Service 
             title="Gift cards" 
             image={require("../assets/Corral_Gift_Card.png")}/>
             </ServiceContainer>
             
             
            </SubContainer>
            </Screen>
        </Container>}
       </Root>
 
    );
}

export default HomeScreen;

const Pressable = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
`

const Container = styled.ScrollView`
    padding: 50px;
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    margin-top: 50px;
`

const SubContainer = styled.View`
 padding-top: 30px
`

const ServiceContainer = styled.View`
 flex-direction: row;
 aign-items: center;
 justify-content: space-around;
 margin-top: 15px;
 margin-bottom: 15px;
`

const Root = styled.View`
    flex: 1;
`

const Title = styled.Text`
 margin-top: 30px;
 color: ${Colors.deep_green};
 font-weight: 700;
 font-size: 20px;
 letter-spacing: 1px;
 margin-bottom: 20px;
`

const Section = styled.ScrollView`
    padding-bottom: 20px;
`

const Header = styled.View`
    background: ${Colors.light};
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    align-items: flex-end;
    padding-left: 15px;
    padding-bottom: 10px;
    flex-direction: row;
`

const Home = styled.Text`
font-size: 26px;
margin-left: 90px;
color: ${Colors.deep_green};
font-weight: 700;
margin-bottom: 7px;
`


const MenuIcon = styled.TouchableOpacity`
 position: absolute;
 top: 50px;
 right: 20px
`

