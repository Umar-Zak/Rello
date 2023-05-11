import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../components/Screen';
import Colors from '../config/Colors';
import {useAppSelector} from "../hooks/CustomReduxHooks"
import Screens from '../navigation/Screens';
const ShopAICategoriesScreen = () => {
    const navigation = useNavigation()
    const firstname = useAppSelector(state => state.auth.userProfile.firstname)

    const handleCardPressed = (screen: string, url: string) => {
        if(!url) return Alert.alert("Info", "Coming soon")
        navigation.navigate(screen as never,url as never)
    }

    return ( 
        <Screen>
            <Container contentContainerStyle={{
                padding: 20
            }}>
            <WelcomeText>
                Welcome to our shopping assistant, 
                <UserName>{`  ${firstname}`}</UserName>
                </WelcomeText>
               <CardsContainer 
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               >
               {
                cards.map((card, index) => (
                    <Card
                    style={{
                     backgroundColor: card.background
                    }}
                    key={index}
                    >
                     <CardBanner 
                     resizeMode="cover"
                     source={card.image} 
                     />
                     <CardTextContent>
                         <CardTitle>
                            {card.title}
                         </CardTitle>
                         <CardText numberOfLines={7}>{card.text}</CardText>
                         <GetStartedButton onPress={() => handleCardPressed(card.screen, card.url)}>
                             <GetStarted>Get started</GetStarted>
                         </GetStartedButton>
                     </CardTextContent>
                     </Card>
                ))
               }
               </CardsContainer>
            </Container>
        </Screen>
    );
}
 
export default ShopAICategoriesScreen;


const Container = styled.ScrollView`
 
`

const WelcomeText = styled.Text`
margin-top: 20px;
font-size: 16px;
color: ${Colors.deep_green};
opacity: 0.8;
margin-bottom: 40px;
`

const UserName = styled.Text`
font-size: 18px;
opacity: 1;
font-weight: 700;
margin-left: 20px;
letter-spacing: 1px;

`

const Card = styled.View`
 width: 320px;
 height: 550px;
 background: #c2f2e6;
 border-radius: 20px;
 margin-right: 20px;
 overflow: hidden;
`

const CardsContainer = styled.ScrollView`

`
const CardBanner = styled.Image`
 width: 100%;
 height: 220px;
`

const CardTextContent = styled.View`
 padding: 20px;
`

const CardTitle = styled.Text`
 font-size: 18px;
 width: 80%;
 line-height: 25px;
 color: ${Colors.deep_green}
 margin-bottom: 20px;
`

const CardText = styled.Text`
 color: ${Colors.dark_grey}
 font-size: 15px;
 width: 85%;
 line-height: 20px;
 margin-bottom: 20px;
`

const GetStartedButton = styled.TouchableOpacity`
 width: 200px;
 height: 50px;
 background: white;
 border-radius: 7px;
 align-items: center;
 justify-content: center;
`

const GetStarted = styled.Text`
 color: ${Colors.deep_green};
 font-size: 17px;
 font-weight: 400;
`

const cards = [
    {
        title: "Plan your vacation with our AI assistant",
        background: "#c2f2e6",
        image: require("../assets/vacation.jpg"),
        text: "With a certain budget, our AI assistant can help you plan your vacation without hassle.Just tell us your budget and we'll plan everything for you from location to food to accomadation. It's that easy!",
        url: "https://shopassistant.herokuapp.com/api/vacationplanner",
        screen: Screens.vaction_planner
    },
    {
        title: "Back to School Planner",
        background: "#fdedbf",
        image: require("../assets/back-to-school.jpg"),
        text: "Back to school planner helps make your return to school memorable like never before! You give us your budget, we suggest to you a couple of things you could buy with that to make your stay in school a sweet experience. How easy is that?",
        url: "",
        screen: ""
    },
    {
        title: "Date Planner",
        background: "#d6d4fc",
        image: require("../assets/restaurant.jpg"),
        text: " Got a date? No hassle chale! That's what we do best. No long talk, just tell us your budget. We've got your date sorted chairman",
        url: "https://shopassistant.herokuapp.com/api/dateplanner",
        screen: Screens.date_planner
    }
]