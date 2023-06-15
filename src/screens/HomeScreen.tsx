import React, {useEffect} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {MaterialIcons} from "@expo/vector-icons"
import { AnyAction } from 'redux';
import SkeletonContent from "react-native-skeleton-content"
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import {loadUserProfile} from "../store/auth/AuthSlice"
import Activity from '../components/Activity';
import {loadDiscountCards, loadSubscribedDiscounts, loadDiscountTransactions} from "../store/entities/DiscountSlice"
import {loadGiftCards} from "../store/entities/GiftSlice"
import {loadLoyaltyCards, loadSubscribedLoyalties, loadLoyaltyTransactions} from "../store/entities/LoyaltySlice"
import {showMenu, showGraph} from "../store/ui/UI"
import { TransactionsModal } from '../components/TransactionsModal';
import Service from '../components/Service';
import Screens from '../navigation/Screens';
import MenuComponent from '../components/Menu';
import TransactionsChart from '../components/TransactionsCharts';
import { loadPromotions } from '../store/entities/PromotionSlice';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import { loadBrands } from '../store/entities/ProductAuthSlice';
import Skeleton from '../components/Skeleton';



function HomeScreen() {
   
    const isLoading = useAppSelector((state) => state.ui.isLoading)
    const dispatch = useAppDispatch()
  
    

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
        dispatch(loadBrands() as unknown as AnyAction)
    }, [])

    const handleAvatarPressed = () => {
        dispatch(showMenu() as unknown as AnyAction)
    }

    
 
    return (
    <>
       {!isLoading && <Root>
        <TransactionsModal/>
       <MenuComponent/>
       <TransactionsChart/>
       <HomeTextContainer>
           <Home>Home</Home>
           <Header>
         <Pressable onPress={handleAvatarPressed} >
         <MaterialIcons name="account-circle"  size={40} color={Colors.dark_grey}/>
         </Pressable>
           <MenuIcon testID='menu' onPress={() => dispatch(showGraph())} >
           <MaterialIcons name="menu"  size={40} color={Colors.dark_grey} />
           </MenuIcon>
       </Header>
           </HomeTextContainer>
       
       {!isLoading && 
       <Container
       showsVerticalScrollIndicator={false} 
       contentContainerStyle={{
           paddingBottom: 80
       }}
       >
       <Screen>
           <SubContainer>
            <ServiceContainer>
            <Service 
            redirectUrl={Screens.dis}
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
            title="Competitions" 
            image={require("../assets/redeem-code.jpg")} 
            />
            <Service 
            title="Gift cards" 
            image={require("../assets/Corral_Gift_Card.png")}
            />
            </ServiceContainer>

            <ServiceContainer>
            <Service 
            redirectUrl={Screens.verification}
            title="Product verification" 
            image={require("../assets/verified.png")} 
            />
           <Service 
            // redirectUrl={Screens.financial_services}
            title="Financial services" 
            image={require("../assets/savings.png")} 
            />
            </ServiceContainer>
            <ServiceContainer>
            <Service 
            redirectUrl={Screens.shop_ai_categories}
            title="Shop assistant" 
            image={require("../assets/shop-assistant.png")} 
            />
           <EmptyService/>
            </ServiceContainer>
           </SubContainer>
           </Screen>
       </Container>}
      </Root>}

  {isLoading && <Skeleton isLoading={isLoading}/>}
    </>
    );
}

export default HomeScreen;

const Pressable = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-left: 10px;
`

const Container = styled.ScrollView`
    padding: 50px;
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    margin-top: 50px;
`

const EmptyService = styled.View`
width: 130px;
height: 130px;
border-radius: 20px;

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


const Header = styled.View`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
z-index: 50;
align-items: flex-end;
flex-direction: row;
`

const HomeTextContainer = styled.View`
background: ${Colors.light};
width: 100%;
height: 100px;
position: absolute;
top: 0;
left: 0;
z-index: 50;
align-items: center;
justify-content: flex-end;
padding-left: 15px;
padding-bottom: 10px;
`

const Home = styled.Text`
font-size: 19px;
color: ${Colors.deep_green};
font-weight: 600;
margin-bottom: 7px;
text-transform: uppercase;
`


const MenuIcon = styled.TouchableOpacity`
 position: absolute;
 top: 50px;
 right: 10px
`
