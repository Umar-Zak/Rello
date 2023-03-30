import React from 'react';
import {Dimensions} from "react-native"
import Animated, {useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolateColor} from "react-native-reanimated"
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {AntDesign} from "@expo/vector-icons"
import Colors from '../config/Colors';
import {getSplashContent} from "../models/StaticContent"
const {width, height} = Dimensions.get("screen")
import Screens from "../navigation/Screens"

const slidesContent = getSplashContent()


const colors = ["#97CBEC", "#ffe4d9", "#c0ecc6"]


const NewDesign = () => {
  const navigation = useNavigation()
  const offset = useSharedValue(0)

  const handleScroll =  useAnimatedScrollHandler(event => {
    offset.value = event.contentOffset.x
   })
 
   

   const stylez = useAnimatedStyle(() => {
    const bg = interpolateColor(
        offset.value,
        [0, width, width * 2],
        colors
    )
    return {
      backgroundColor: bg
    }
  })
   
  const colorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
        offset.value,
        [0, width, width * 2],
        colors
    )
    return {
      color: color
    }
  })
    return ( 
       <AnimatedContainer 
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={false}
          onScroll={handleScroll}
          decelerationRate="fast"
          scrollEventThrottle={1}
       >
      {
        slidesContent.map((slide, index) => (
        <Slide key={index}>
        <AnimatedSlideBanner style={[stylez]}>
           <TagContainer>
           <Tag>{slide.tag}</Tag>
           </TagContainer>
           <BannerImage resizeMode='contain' source={slide.image} />
        </AnimatedSlideBanner>
        <SlideFooter>
            <AnimatedSlideUnderlay style={[stylez]} />
            <SlideFooterContent>
            <Title>{slide.title}</Title>
            <Tagline>{slide.content}</Tagline>
           {index < (slidesContent.length - 1) && 

          <SwipeButton>
             <AnimatedButtonText style={[{fontSize: 20}, colorStyle]}>Swipe</AnimatedButtonText>
             <AntDesign name="doubleright" size={25} color={colors[index]} />
          </SwipeButton>
            }
            {index == (slidesContent.length - 1) && 
            <Pressable onPress={() => navigation.navigate(Screens.login as never)}>
            <AnimatedButton style={[stylez]}>
            <ButtonText>Login</ButtonText>
            </AnimatedButton>
            </Pressable>
            }
            </SlideFooterContent>
        </SlideFooter>
      </Slide>
    
        ))
      }
       </AnimatedContainer>
     );
}
 
export default NewDesign;

const Container = styled.ScrollView`
 flex: 1;
 background-color: white;
`


const AnimatedContainer = Animated.createAnimatedComponent(Container)


const Slide = styled.View`
width: ${width}px;
height: ${height}px;
background-color: white;
`

const SlideBanner = styled.View`
 width: ${width}px;
 height: 55%;
 border-bottom-right-radius: 100px;
`
const BannerImage = styled.Image`
 width: ${width}px;
 height: 80%;
 position:absolute;
 z-index: -100;
 left: 20%;
 top: 10%;
`

const AnimatedSlideBanner = Animated.createAnimatedComponent(SlideBanner)

const SlideFooter = styled.View`
 width: ${width}px;
 height: 45%;
`

const SlideFooterContent = styled.View`
 width: ${width}px;
 height: 100%;
 position: absolute;
 top: 0;
 z-index: 100;
 background-color: white;
 border-top-left-radius: 80px;
 padding-left: 20px;
 padding-right: 20px;
 
`
const SlideUnderlay = styled.View`
 width: ${width}px;
 height: 100%;
`
const Tag = styled.Text`
 font-size: 40px;
 font-weight: 700;
 letter-spacing: 1px;
 color: white;
`

const TagContainer = styled.View`
height: 100px;
margin-top:auto;
margin-bottom: auto;
align-items: center;
justify-content: center;
transform: rotate(90deg);
left: ${width/-2.5}px;
`

const Title = styled.Text`
 text-align: center;
 margin-top: 30px;
 color: ${Colors.deep_green};
 font-size: 24px;
 font-weight: 500;
 margin-bottom: 10px;
`

const Tagline = styled.Text`
text-align: center;
 line-height: 24px;
 font-size: 16px;
 color: ${Colors.deep_green};
 opacity: 0.7;
 margin-bottom: 30px;
`

const Button = styled.View`
 width: 100%;
 height: 50px;
 border-radius: 30px;
 align-items: center;
 justify-content: center;
 
`

const ButtonText = styled.Text`
 color: white;
 font-size: 17px;
 font-weight: 600;
 text-align: center;
 margin-right: 15px;
`

const AnimatedButtonText = Animated.createAnimatedComponent(ButtonText)
const SwipeButton = styled.View`
 width: 100%;
 height: 40px;
 flex-direction: row;
 align-items: center;
 justify-content: center;

`
const Pressable = styled.TouchableOpacity``

const AnimatedButton = Animated.createAnimatedComponent(Button)
const AnimatedSlideUnderlay = Animated.createAnimatedComponent(SlideUnderlay)