import  React, {useEffect, useState} from 'react';
import { Animated} from 'react-native';
import {useDispatch, useSelector} from "react-redux"
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons"
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import { useNavigation } from '@react-navigation/native';
import Colors from "../config/Colors"
import Auth, { UserProfile } from '../services/Auth';
import {logoutUser} from "../store/auth/AuthSlice"
import {closeMenu, showTransModal} from "../store/ui/UI"
import Screens from "../navigation/Screens"


const MenuComponent = () => {
    const dispatch = useDispatch()
    const [showingPersonalInfo, setShowingPersonalInfo] = useState(false)
    const userProfile = useSelector<any, UserProfile>((state: any) => state.auth.userProfile)
    const offset = useSelector<any, number>((state: any) => state.ui.menuOffset)
    const [top] = React.useState(new Animated.Value(offset))
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
       {showingPersonalInfo && 
       <SettingsContainer>
          <CloseIcon onPress={() => setShowingPersonalInfo(false)}>
                <AntDesign color="#28c8a4" name="closecircle" size={50} />
                </CloseIcon>
            <UserDataComponent {...userProfile} />
        </SettingsContainer>}
        <AndroidOverlay>
        <MenuScroll>
        <MenuItemsContainer>
        <MenuItem onPress={() => setShowingPersonalInfo(true)}>
        <MenuItemText>Profile Info</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        <MenuItem onPress={() => dispatch(showTransModal() as unknown as AnyAction)} >
        <MenuItemText >Transactions</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        <MenuItem onPress={handleWalletPressed}>
        <MenuItemText>Wallet</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        </MenuItemsContainer>
        <BottomActionsContainer>
        <LogoutContainer onPress={handleLogout} >
        <AntDesign name="logout" color={Colors.green} size={25} />
      <Logout>Logout</Logout>
      </LogoutContainer>
         <Pressable onPress={closedMenu} >
         <AntDesign color="#28c8a4" name="closecircle" size={50} />
         </Pressable>
        </BottomActionsContainer>
           </MenuScroll>
        </AndroidOverlay>
      
      </AnimatedMenu>
     );
}
 
export default MenuComponent;


const UserDataComponent = (userProfile: UserProfile) => {
    return (<>
              
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
            </>
    )
}


const SettingsContainer = styled.View`
width: 100%;
height: 100%;
position: absolute;
left: 0;
z-index: 100;
background: #002147;
padding-left: 20px;
padding-right: 20px;
padding-top: 100px;
`

const CloseIcon = styled.TouchableOpacity`
    position: absolute;
    top: 60px;
    right: 20px;
    z-index: 100;
`
const MenuScroll = styled.ScrollView``

const Pressable = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
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
color: white;
font-weight: 400;
font-size: 16px;
`

const AndroidOverlay = styled.View`
     width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 80;
    background: #002147;
    padding-top: 120px;
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
    z-index: 80;
`

const MenuItemsContainer = styled.View`
 width: 100%;
 height: 400px;
 background: #001528;
 margin-bottom: 15px;
 border-radius: 15px;
 margin-bottom: 15px;
 padding-left: 10px;
 padding-right: 10px;
`

const MenuItem = styled.TouchableOpacity`
 width: 100%;
 height: 40px;
 margin-top: 10px;
 margin-bottom: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between
`

const MenuItemText = styled.Text`
 color: white;
 font-size: 18px;
 margin-left: 10px;
 font-weight: 400;
`

const Liner = styled.View`
 width: 100%;
 height: 1px;
 background: white;
 opacity: 0.5;
`

const BottomActionsContainer = styled.View`
width: 100%;
height: 180px;
background: #001528;
margin-bottom: 15px;
border-radius: 15px;
`

const AnimatedMenu = Animated.createAnimatedComponent(Menu)

