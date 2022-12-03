import React, {useState} from 'react';
import { Animated} from 'react-native'
import "styled-components"
// import {StatusBar} from "expo-status-bar"
import * as Sentry from "sentry-expo"
import styled from 'styled-components/native';
import {useNavigation} from "@react-navigation/native"
import Colors from '../config/Colors';
import { getSplashContent } from '../models/StaticContent';
import Screens from '../navigation/Screens';
const contents = getSplashContent()



function SplashScreen() {
    const [leftOffset] = useState(new Animated.Value(0))
    const [secondLeftOffset] = useState(new Animated.Value(0))
    const [thirdLeftOffset] = useState(new Animated.Value(0))
    const navigation = useNavigation()


    const handleNext = () => {
            Animated.timing(leftOffset, {
                toValue: -1000,
                duration: 1000,
                useNativeDriver: false
            }).start()
       
    }

    const handleSecondNext = () => {
        Animated.timing(secondLeftOffset, {
            toValue: -1000,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    const handleSignIn = () => {
        navigation.navigate(Screens.login as never)
    }

    return (
       <Container>
        <AnimatedContent style={{
            left: leftOffset
        }}>
                <Banner source={contents[0].image}  />
                <Content>
                    <Title>{contents[0].title}</Title>
                    <Tagline>{contents[0].content}</Tagline>
                    <ActivityContainer>
                        {contents.map((c,  i) => (
                            <Activity style={{opacity: i === 0? 1: 0.3}} key={i} />
                        ))}
                    </ActivityContainer>
                 <NextButton onPress={handleNext}>
                        <NextText>Next</NextText>
                    </NextButton>
                </Content>
         
        </AnimatedContent>
        <AnimatedContent 
        style={{
            zIndex: 80,
            left: secondLeftOffset
        }}
       >
            <SafeArea>
                <Banner source={contents[1].image}  />
                <Content>
                    <Title>{contents[1].title}</Title>
                    <Tagline>{contents[1].content}</Tagline>
                    <ActivityContainer>
                        {contents.map((c,  i) => (
                            <Activity style={{opacity: i === 1? 1: 0.3}} key={i} />
                        ))}
                    </ActivityContainer>
                     <NextButton onPress={handleSecondNext}>
                        <NextText>Next</NextText>
                    </NextButton>
                </Content>
            </SafeArea>
        </AnimatedContent>
        <AnimatedContent 
        style={{
            zIndex: 50,
            left: thirdLeftOffset
        }}
       >
            <SafeArea>
                <Banner source={contents[2].image}  />
                <Content>
                    <Title>{contents[2].title}</Title>
                    <Tagline>{contents[2].content}</Tagline>
                    <ActivityContainer>
                        {contents.map((c,  i) => (
                            <Activity style={{opacity: i === 2? 1: 0.3}} key={i} />
                        ))}
                    </ActivityContainer>
                   <NextButton onPress={handleSignIn}>
                        <NextText>Sign In</NextText>
                    </NextButton>
                </Content>
            </SafeArea>
        </AnimatedContent>
       </Container>
    );
}


export default SplashScreen;

const Activity = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: ${Colors.green};
`
const ActivityContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 40px;
    padding-left: 20%;
    padding-right: 20%;
`

const Banner = styled.Image`
    width: 100%;
    height: 54%;
    z-index: 100;
    transform: scale(1.0) translateY(15px);
    margin-top: -65px;
`

const Container = styled.View`
flex: 1;
`
const Content = styled.View`
padding: 5%;
margin-top: 7%;
`
const ContentContainer = styled.View`
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    top: 0;
    z-index: 100;
`

const NextButton = styled.TouchableOpacity`
    width: 200px;
    height: 50px;
    border-radius: 40px;
    background: ${Colors.green};
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
`
const NextText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 17px;
`

const Title = styled.Text`
text-align: center;
color: ${Colors.deep_green};
font-weight: 700;
font-size: 23px;
letter-spacing: 1px;
margin-bottom: 20px;

`
const Tagline = styled.Text`
font-weight: 500;
font-size: 15px;
line-height: 25px;
margin-left: 30px;
color: #acacac;
width: 300px;
text-align:center
`

const AnimatedContent = Animated.createAnimatedComponent(ContentContainer)

const SafeArea = styled.SafeAreaView`
width: 100%;
height: 100%;
`