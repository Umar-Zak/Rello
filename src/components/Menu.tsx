import  React, {useEffect, useState} from 'react';
import { Animated, Dimensions} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons"
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import { useNavigation } from '@react-navigation/native';
import Colors from "../config/Colors"
import { UserProfile} from '../services/Auth';
import {closeMenu, showTransModal} from "../store/ui/UI"
import Screens from "../navigation/Screens"
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
const {height} = Dimensions.get("screen")


const MenuComponent = () => {
    const dispatch = useAppDispatch()
    const [showingPersonalInfo, setShowingPersonalInfo] = useState(false)
    const userProfile = useAppSelector(({auth}) => auth.userProfile)
    const offset = useAppSelector(({ui}) => ui.menuOffset)
    const [top] = useState(new Animated.Value(offset))
    const navigation = useNavigation()

    useEffect(() => {
        Animated
        .spring(top, {toValue: offset, useNativeDriver: false})
        .start()
    }, [offset])

    const closedMenu = () => {
        dispatch(closeMenu() as unknown as AnyAction)
    }

    const handleWalletPressed = () => {
        dispatch(closeMenu() as unknown as AnyAction)
        navigation.navigate(Screens.wallets as never)
    }

    
    
    return ( 
        <AnimatedMenu
      style={{
        top: top
      }}
      >
       {showingPersonalInfo && 
       <SettingsContainer>
        <SettingsBanner/>
        <SettingContentContainer>
        <SettingsUnderlay/>
        <SettingsContent>
           <UserDataComponent {...userProfile} />
        </SettingsContent>
        </SettingContentContainer>
          <CloseIcon onPress={() => setShowingPersonalInfo(false)}>
                <AntDesign color="white" name="closecircle" size={40} />
                </CloseIcon>
         
        </SettingsContainer>}
        <AndroidOverlay>
            <Banner>
                <Title>My Profile</Title>
            </Banner>
           <MenuScroll>
           <UnderlayGreen/>
           <UnderlayDark>
            <Pressable onPress={closedMenu} >
            <AntDesign color="#97CBEC" name="close" size={30} />
            </Pressable>
           </UnderlayDark>
           <ScrollContent>
            <MenuItem onPress={() => setShowingPersonalInfo(true)}>
            <MenuItemText>Profile Info</MenuItemText>
            <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
            </MenuItem>
            <MenuItem onPress={() => dispatch(showTransModal() as unknown as AnyAction)} >
            <MenuItemText >Transactions</MenuItemText>
            <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
            </MenuItem>
           < MenuItem onPress={handleWalletPressed}>
            <MenuItemText>Wallet</MenuItemText>
            <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
            </MenuItem>
           </ScrollContent>
           </MenuScroll>
        </AndroidOverlay>
      </AnimatedMenu>
     );
}
 
export default MenuComponent;


const UserDataComponent = (userProfile: UserProfile) => {
    return (
              <ScrollView>
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
            </ScrollView>
    )
}

const Banner = styled.View`
 width: 100%;
 height: ${height / 5}px;
 background-color: #97CBEC;
 border-bottom-left-radius: 80px;
 justify-content: center;
`

const SettingsBanner = styled.View`
width: 100%;
 height: ${height / 5}px;
 background-color: #97CBEC;
 justify-content: center;
 border-bottom-right-radius: 80px;
`

const SettingsContainer = styled.View`
width: 100%;
height: 100%;
position: absolute;
left: 0;
z-index: 100;
background: white;
`

const SettingsContent = styled.View`
 width: 100%;
 height: ${(height/ 5) * 4}px;
 background-color: white;
 position: absolute;
 top: 0;
 border-top-left-radius: 60px;
 padding-left: 20px;
 padding-right: 20px;
`

const SettingContentContainer = styled.View`
width: 100%;
height: ${(height/ 5) * 4}px;
`

const SettingsUnderlay = styled.View`
width: 100%;
height: 100%;
background-color: #97CBEC
`

const CloseIcon = styled.TouchableOpacity`
    position: absolute;
    top: 60px;
    right: 20px;
    z-index: 100;
`
const MenuScroll = styled.View`
 width: 100%;
 height: ${(height/ 5) * 4}px;
`

const UnderlayGreen = styled.View`
 width: 100%;
 height: ${(height / 5) * 2}px;
 background-color: #97CBEC;
`

const UnderlayDark = styled.View`
 width: 100%;
 height: ${(height / 5) * 2}px;
 background-color: #97CBEC;
 justify-content: flex-end;
 padding-bottom: 110px;
 align-items: center;
`

const ScrollContent = styled.ScrollView`
 position: absolute;
 top: 0;
 width: 100%;
 height: ${(height / 4) * 2.4}px;
 background-color: white;
 border-bottom-left-radius: 40px;
 border-bottom-right-radius: 40px;
 border-top-right-radius: 70px;
 padding-left: 20px;
 padding-right: 20px;
 padding-top: 50px;
`

const Pressable = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 40px;
    height: 40px;
    border-radius: 20px;
`
const PersonalSettings = styled.Text`
    color: white;
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
    background:white;
`

const Menu = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 80;
`


const MenuItem = styled.TouchableOpacity`
 width: 100%;
 height: 60px;
 margin-top: 10px;
 margin-bottom: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 border: 1px solid rgba(0, 0, 0, 0.2);
 border-radius: 5px;
 background: #fafbfd;
`

const MenuItemText = styled.Text`
 color: ${Colors.deep_green};
 font-size: 18px;
 margin-left: 10px;
 font-weight: 400;
`

const Title = styled.Text`
 text-align: center;
 font-weight: 500;
 font-size: 22px;
 letter-spacing: 1px;
 color: white;
`



const AnimatedMenu = Animated.createAnimatedComponent(Menu)

const ScrollView = styled.ScrollView``