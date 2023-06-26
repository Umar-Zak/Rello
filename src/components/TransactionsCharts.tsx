import React, {useState, useEffect} from "react";
import {Dimensions, Animated, Alert} from "react-native"
import {AntDesign} from "@expo/vector-icons"
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { AnyAction } from "redux";
import {closeGraph} from "../store/ui/UI"
import Colors from "../config/Colors";
import Auth from "../services/Auth";
import {logoutUser} from "../store/auth/AuthSlice"
import Screens from "../navigation/Screens"
import { useAppDispatch, useAppSelector } from "../hooks/CustomReduxHooks";
import Activity from "./Activity";

const TransactionsChart = () => {
    const dispatch = useAppDispatch()
    const offset = useAppSelector((state) => state.ui.graphOffset)
    const [top] = useState(new Animated.Value(offset))
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        Animated.spring(top, {toValue: offset, useNativeDriver: false})
        .start()
    }, [offset])


    const handleLogout = async() => {
        await Auth.logout()
        dispatch(logoutUser())
    }

    // const handleContactPressed = () => {
    //     dispatch(closeGraph() as unknown as AnyAction)
    //     navigation.navigate(Screens.contact as never)
    // }
      

    const handleNavigationPressed = (url: string) => {
        dispatch(closeGraph() as unknown as AnyAction)
        navigation.navigate(url as never)
    }

    const handleDeleteAccount = () => {
        
        const message =  "Deleting your account will wipe out all your data from our systems. This is not reversible"
        Alert.alert("WARNING", message, [
            {
                text: "Cancel"
            },
            {
                text: "Continue",
                onPress: async() => {
                    try {
                        setIsLoading(true)
                        await Auth.deleteUserAccount()
                        setIsLoading(false)
                        dispatch(logoutUser() as unknown as AnyAction)
                    } catch (error: any) {
                        setIsLoading(false)
                       Alert.alert("ERROR", "Something went wrong")
                        
                    }
                }
            }
        ])
    }

    return ( 
        <AnimatedContainer style={{
            top: top
        }}>
       {isLoading && <Activity/>}
      <SubContainer>
       <MenuItemsContainer>
        <MenuItem onPress={() => handleNavigationPressed(Screens.loyalty)}>
        <MenuItemText>Loyalty cards</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        <MenuItem onPress={() => handleNavigationPressed(Screens.dis)}>
        <MenuItemText>Discount cards</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        <MenuItem onPress={() => handleNavigationPressed(Screens.promo)}>
        <MenuItemText>Promotions</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        <MenuItem onPress={() => handleNavigationPressed(Screens.contact)}>
        <MenuItemText>Contact us</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <Liner/>
        <MenuItem onPress={() => handleNavigationPressed(Screens.about)}>
        <MenuItemText>About us</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
        <MenuItem onPress={() => handleNavigationPressed(Screens.faqs)}>
        <MenuItemText>FAQs</MenuItemText>
        <MaterialCommunityIcons name="chevron-right" color={Colors.green} size={30} />
        </MenuItem>
       <DeleteButton onPress={handleDeleteAccount}>
        <DeleteText>Delete account</DeleteText>
       </DeleteButton>
        <Liner/>
       </MenuItemsContainer>
       <AuthContainer>
       <LogoutContainer onPress={handleLogout}>
        <AntDesign name="logout" color={Colors.green} size={25} />
      <Logout>Logout</Logout>
      </LogoutContainer>
      <CloseIcon onPress={() => dispatch(closeGraph() as unknown as AnyAction)}>
    <AntDesign name="close" size={30} color="white" />
    </CloseIcon>
       </AuthContainer>
    </SubContainer>
    </AnimatedContainer>
     );
}
 
export default TransactionsChart;


  const width = Dimensions.get("window").width 
  const height = Dimensions.get("window").height
  
  
  const Container = styled.SafeAreaView`
  flex: 1;
  position: absolute;
  left: 0;
  z-index: 100;
  `



  const CloseIcon = styled.TouchableOpacity`
   z-index: 100;
   background: ${Colors.green}
   height: 40px;
   width: 40px;
   align-items: center;
   justify-content: center;
   border-radius: 20px;
   margin-left: auto;
   margin-right: auto
  `

  const SubContainer = styled.ScrollView`
   width: ${width}px;
   height: ${height}px;
   background: white;
   padding-left: 10px;
   padding-right: 10px;
   padding-top: 30px;
  `

const MenuItemsContainer = styled.View`
 width: 100%;
 height: 500px;
 background: white;
 margin-bottom: 15px;
 margin-bottom: 15px;
 padding-left: 10px;
 padding-right: 10px;

`

const MenuItem = styled.TouchableOpacity`
 width: 100%;
 max-width: 700px;
 margin-left: auto;
 margin-right: auto;
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

const Liner = styled.View`
 width: 100%;
 height: 1px;
 background: white;
 opacity: 0.5;
`

const LogoutContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    justify-content: center;
    margin-top: 85px;
`
const Logout = styled.Text`
    margin-left: 10px;
    font-weight: 600;
    font-size: 18px;
    color: ${Colors.green};
`

  const AnimatedContainer = Animated.createAnimatedComponent(Container)
  
  const AuthContainer = styled.View`
  width: 100%;
  height: 300px;
  `

  const DeleteButton = styled.TouchableOpacity`
   width: 100%;
   height: 50px;
   max-width: 700px;
   margin-left: auto;
   margin-right: auto;
   border-radius: 5px;
   border: 1px solid red;
   align-items: center;
   justify-content: center;
  `

  const DeleteText = styled.Text`
   color: red;
   font-weight: 400;
   font-size: 15px;
   letter-spacing: 1px;
  `