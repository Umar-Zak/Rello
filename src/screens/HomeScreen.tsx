import React, {useState, useEffect} from 'react';
import { Animated, Platform} from 'react-native'
import "styled-components"
import styled from 'styled-components/native';
import {useDispatch, useSelector} from "react-redux"
import {MaterialIcons, AntDesign} from "@expo/vector-icons"
import { BlurView } from 'expo-blur'
import { AnyAction } from 'redux';
import DiscountCard from '../components/DiscountCard';
import GiftCard from '../components/GiftCard';
import LoyaltyCard from '../components/LoyaltyCard';
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import DiscountModa from '../components/DiscountModal';
import {loadUserProfile, logoutUser} from "../store/auth/AuthSlice"
import { DiscountInterface, GiftCardInterface, LoyaltyInterface } from '../models/DTOS';
import Auth, { UserProfile } from '../services/Auth';
import Activity from '../components/Activity';
import {loadDiscountCards, loadSubscribedDiscounts, loadDiscountTransactions} from "../store/entities/DiscountSlice"
import {loadGiftCards} from "../store/entities/GiftSlice"
import {loadLoyaltyCards, loadSubscribedLoyalties} from "../store/entities/LoyaltySlice"
import {showTransModal} from "../store/ui/UI"
import { TransactionsModal } from '../components/TransactionsModal';
function HomeScreen() {
    const discounts = useSelector<any, DiscountInterface[]>((state: any) => state.entities.discount.discounts)
    const giftCards = useSelector<any, GiftCardInterface[]>((state: any) => state.entities.gift.gifts)
    const loyalties = useSelector<any, LoyaltyInterface[]>((state: any) => state.entities.loyalty.loyalties)
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
    }, [])

    const handleAvatarPressed = () => {
        Animated
        .spring(top, {toValue: 0, useNativeDriver: false})
        .start()
    }

    const closeMenu = () => {
        Animated
        .spring(top, {toValue: -2000, useNativeDriver: false})
        .start()
    }

    const handleLogout = async() => {
        await Auth.logout()
        dispatch(logoutUser())
    }
 
    return (
       <Root>
         <TransactionsModal/>
        {isLoading && <Activity/>}
        <DiscountModa/>
      <AnimatedMenu
      style={{
        top: top
      }}
      >
        {Platform.OS === "android" && <AndroidOverlay>
        <MenuScroll>
           <PersonalSettings>Personal Info</PersonalSettings>
            <InfoContainer>
                <InfoLabel>First name</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.firstname}</Info>
                </InfoView>
            </InfoContainer>
            <InfoContainer>
                <InfoLabel>Last name</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.lastname}</Info>
                </InfoView>
            </InfoContainer>
            <InfoContainer>
                <InfoLabel>Phone number</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.contact}</Info>
                </InfoView>
            </InfoContainer>
            <InfoContainer>
            <InfoLabel>Email</InfoLabel>
            <InfoView>
            <Info>{userProfile?.email}</Info>
            </InfoView>
            </InfoContainer>
      <LogoutContainer onPress={handleLogout} >
        <AntDesign name="logout" color={Colors.green} size={25} />
      <Logout>Logout</Logout>
      </LogoutContainer>
         <Pressable onPress={closeMenu} >
         <AntDesign color={Colors.deep_green} name="closecircle" size={50} />
         </Pressable>
           </MenuScroll>
        </AndroidOverlay>}
      {Platform.OS === "ios" && <BlurView
        tint='light'
        intensity={100}
        style={{
            width: "100%",
            height: "100%",
            paddingTop: 100,
            paddingBottom: 20,
            paddingHorizontal: 20
        }}
        >
           <MenuScroll>
           <PersonalSettings>Personal Info</PersonalSettings>
            <InfoContainer>
                <InfoLabel>First name</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.firstname}</Info>
                </InfoView>
            </InfoContainer>
            <InfoContainer>
                <InfoLabel>Last name</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.lastname}</Info>
                </InfoView>
            </InfoContainer>
            <InfoContainer>
                <InfoLabel>Phone number</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.contact}</Info>
                </InfoView>
            </InfoContainer>
            <InfoContainer>
                <InfoLabel>Email</InfoLabel>
                <InfoView>
                    <Info>{userProfile?.email}</Info>
                </InfoView>
            </InfoContainer>
      <LogoutContainer onPress={handleLogout} >
        <AntDesign name="logout" color={Colors.green} size={25} />
      <Logout>Logout</Logout>
      </LogoutContainer>
         <Pressable onPress={closeMenu} >
         <AntDesign color="white" name="closecircle" size={50} />
         </Pressable>
           </MenuScroll>
        
        </BlurView>
        }
      </AnimatedMenu>
        <Header>
          <Pressable onPress={handleAvatarPressed} >
          <MaterialIcons name="account-circle"  size={40} color={Colors.dark_grey}/>
          </Pressable>
            <Home>Home</Home>
            <MenuIcon onPress={() => dispatch(showTransModal())} >
            <MaterialIcons name="menu"  size={40} color={Colors.dark_grey}/>
            </MenuIcon>
        </Header>
        {!isLoading && <Container
        showsVerticalScrollIndicator={false} 
        >
        <Screen>
            <>
            <Title>Discount Offers</Title>
            <Section 
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            >
           {
            discounts.map((disc, index) => (
                <DiscountCard {...disc} key={index}/>
            ))
           }
           
            </Section>
            <Title>Giftcards Trending</Title>
            <Section
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            >
              {
                giftCards.map((card, index) => (
                    <GiftCard {...card} key={index} />
                ))
              }
            </Section>
            <Title>Loyalty Cards</Title>
            <Section
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            >
            {
                loyalties.map((loyalty, index) =>(
                    <LoyaltyCard {...loyalty} key={index} />
                )
                )
            }
            </Section>
            </>
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
const Logout = styled.Text`
    margin-left: 10px;
    font-weight: 600;
    font-size: 18px;
    color: ${Colors.green};
`
const LogoutContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    justify-content: center;
    margin-top: 40px;
`
const Menu = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 100;
`

const AndroidOverlay = styled.View`
     width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 80;
    background: white;
    padding-top: 100px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
`

const MenuIcon = styled.TouchableOpacity`
 position: absolute;
 top: 50px;
 right: 20px
`

const MenuScroll = styled.ScrollView``

const PersonalSettings = styled.Text`
    color: ${Colors.deep_green};
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 22px;
    text-align: center;
`
const InfoContainer = styled.View`
margin-bottom: 20px;
    
`

const InfoLabel = styled.Text`
    margin-bottom: 13px;
    font-weight: 500;
    font-size: 17px;
    color: ${Colors.dark_grey};
`

const InfoView = styled.View`
width: 100%;
height: 50px;
padding-left: 15px;
padding-right: 15px;
justify-content: center;
border: 1px solid ${Colors.dark_grey};
border-radius: 7px;
`

const Info = styled.Text`
color: ${Colors.deep_green};
font-weight: 400;
font-size: 16px;
`

const AnimatedMenu = Animated.createAnimatedComponent(Menu)

