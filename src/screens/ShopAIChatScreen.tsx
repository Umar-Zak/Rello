import React, {useState} from 'react';
import {Alert, Dimensions} from "react-native"
import styled from 'styled-components/native';
import {Ionicons} from "@expo/vector-icons"
import axios from 'axios';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Screen from '../components/Screen';
import { useRoute } from '@react-navigation/native';
import { useAppSelector } from '../hooks/CustomReduxHooks';
import Activity from '../components/Activity';



const height = Dimensions.get("screen").height

const ShopAIChatScreen = () => {
  const {params} = useRoute()
  const [showingLoader, setShowingLoader] = useState(false)
  const [showingResultsModal, setShowingResultsModal] = useState(false)
  const [budget, setBudget] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState("")
  const [response, setResponse] = useState("")
  const firstName = useAppSelector(state => state.auth.userProfile.firstname)

    const handleSubmit = async() => {
    if(!budget || !numberOfPeople) return
      
      setResponse("")
     setShowingLoader(true)
     try {
      const {data} = await axios.post<string>(params as unknown as string, {
        budget: Number(budget),
        numberOfPeople: Number(numberOfPeople)
        })
        setResponse(data)
        resetScreenState()
     } 
     catch (error: any) {
      setShowingLoader(false)
      Alert.alert("ERROR", "Something went wrong")
     }

    }

    const resetScreenState = () => {
        setBudget("")
        setNumberOfPeople("")
        setShowingLoader(false)
        setShowingResultsModal(true)
    }

    const data = response.split("\n")

    return (
        <Screen>
          <>
          {showingLoader && <Activity/>}
         <Container>
        {showingResultsModal && <FeedBackModal 
         contentContainerStyle={{
          padding: 20,
          paddingTop: 50
         }}
         >
         <CloseTextContainer onPress={() => setShowingResultsModal(false)}>
         <CloseText>Close</CloseText>
         </CloseTextContainer>
        
         {
              data.map((feedback, index) => (
                <FeedbackText key={index}>{feedback}</FeedbackText>
              ))
             }
         </FeedBackModal>}

            <KeyboardAwareScrollView>
           <SubContainer>
          
           <FeedBackContainer
            >
              <WelcomeTextContainer>
              <WelcomeText>Just tell us your budget, 
                <UserName>{`  ${firstName}`}</UserName>
                </WelcomeText>
              </WelcomeTextContainer>
           <Form>
           <TextContainer>
            <TextInput
            placeholder="How much is your budget?"
            value={budget}
            keyboardType="numeric"
            onChangeText={text => setBudget(text)}
            />
            </TextContainer>
            <TextContainer>
            <TextInput
            placeholder="How many people?"
            value={numberOfPeople}
            keyboardType="numeric"
            onChangeText={text => setNumberOfPeople(text)}
            />
            </TextContainer>
            <SubmitButton onPress={handleSubmit}>
             <SubmiteButtonText>Submit</SubmiteButtonText>
            </SubmitButton>
           </Form>
            </FeedBackContainer>
           </SubContainer>
           </KeyboardAwareScrollView>
           </Container>
           </>
        </Screen>
    );
}
 
export default ShopAIChatScreen;

const Container = styled.View`
width: 100%;
max-width: 700px;
margin-left: auto;
margin-right: auto;
`

const SubContainer = styled.View`
 height: 90%;
 padding: 20px;
 flex-direction: column;
 
`

const FeedBackContainer = styled.View`
 height: ${height - 250}px;
 margin-bottom: 20px;
`

const TextContainer = styled.View`
 width: 100%;
 height: 50px;
 border-radius: 20px;
 padding-left: 15px;
 padding-right: 10px;
 background: white;
 border: 0.5px solid #03d3a7
 flex-direction: row;
 align-items: center;
 margin-bottom: 15px;
`

const TextInput = styled.TextInput`
 height: 100px;
 width: 100%
`

const Touchable = styled.TouchableOpacity``

const WelcomeText = styled.Text`
font-size: 16px;
color: white;
opacity: 0.8;
`

const UserName = styled.Text`
 font-size: 18px;
 font-weight: 400;
 opacity: 1
`

const WelcomeTextContainer = styled.View`
 background: #03d3a7;
 height: 50px;
 padding: 10px;
 border-top-right-radius: 2px;
 border-top-left-radius: 20px;
 border-bottom-left-radius: 2PX
 border-bottom-right-radius: 25px;
`

const FeedbackText = styled.Text`
 font-weight: 300;
 font-size: 15px;
 margin-bottom: 15px;
`

const FeedBackModal = styled.ScrollView`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
z-index: 120;
background: white;
`

const CloseTextContainer = styled.TouchableOpacity`
 position: absolute;
 top: 5px;
 right: 15px
`

const CloseText = styled.Text`
 color: #2bcec4;
 font-weight: 500;
 font-size: 17px;
`

const Form = styled.View`
 margin-top: 50px;
`

const SubmitButton = styled.TouchableOpacity`
 width: 100%;
 height: 50px;
 background: #2bcec4;
 border-radius: 10px;
 margin-top: 20px;
 align-items: center;
 justify-content: center;
`

const SubmiteButtonText = styled.Text`
 color: white;
 font-weight: 500;
 font-size: 16px
`