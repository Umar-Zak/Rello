import  React, {useEffect} from 'react';
import { Animated, Platform } from 'react-native';
import { BlurView } from 'expo-blur'
import {useDispatch, useSelector} from "react-redux"
import {AntDesign} from "@expo/vector-icons"
import styled from 'styled-components/native';
import Colors from "../config/Colors"
import Auth, { UserProfile } from '../services/Auth';
import {logoutUser} from "../store/auth/AuthSlice"
import {closeMenu} from "../store/ui/UI"
import { AnyAction } from 'redux';


const MenuComponent = () => {
    const dispatch = useDispatch()
    const userProfile = useSelector<any, UserProfile>((state: any) => state.auth.userProfile)
    const offset = useSelector<any, number>((state: any) => state.ui.menuOffset)
    const [top] = React.useState(new Animated.Value(offset))


    useEffect(() => {
        Animated
        .spring(top, {toValue: offset, useNativeDriver: false})
        .start()
    }, [offset])

    const closedMenu = () => {
        dispatch(closeMenu() as unknown as AnyAction)
    }

    const handleLogout = async() => {
        await Auth.logout()
        dispatch(logoutUser())
    }
    
    return ( 
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
         <Pressable onPress={closedMenu} >
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
         <Pressable onPress={closedMenu} >
         <AntDesign color="white" name="closecircle" size={50} />
         </Pressable>
           </MenuScroll>
        
        </BlurView>
        }
      </AnimatedMenu>
     );
}
 
export default MenuComponent;


const MenuScroll = styled.ScrollView``

const Pressable = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
`
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
const LogoutContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    justify-content: center;
    margin-top: 40px;
`
const Logout = styled.Text`
    margin-left: 10px;
    font-weight: 600;
    font-size: 18px;
    color: ${Colors.green};
`
const Menu = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 100;
`

const AnimatedMenu = Animated.createAnimatedComponent(Menu)

