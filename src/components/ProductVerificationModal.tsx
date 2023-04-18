import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import {Animated, Alert} from "react-native"
import * as Yup from "yup"
import {useAppSelector, useAppDispatch} from "../hooks/CustomReduxHooks";
import {closeVerificationModal} from "../store/ui/UI"
import { AnyAction } from "redux";
import {AntDesign} from "@expo/vector-icons"
import Form from "./Form";
import AppTextInput from "./AppTextInput";
import SubmitButton from "./SubmitButton";
import Map from "./Map";
import ProductAuthService from "../services/ProductAuthService";


const validationSchema = Yup.object().shape({
    code: Yup
    .string()
    .required("Product code is required")
    .label("Product code")
})

const ProductVerificationModal = () => {
    const dispatch = useAppDispatch()
    const offset = useAppSelector(({ui}) => ui.verificationModalOffset)
    const selectedBrand= useAppSelector(({entities: {productAuth}}) => productAuth.selectedBrand)
    const [top] = useState(new Animated.Value(offset))
    const [showingMap, setShowingMap] = useState(false)
    useEffect(() => {
        Animated.timing(top, {toValue: offset, useNativeDriver: false, duration: 500})
        .start()
    }, [offset])



    const handleModalClose = () => {
        dispatch(closeVerificationModal() as unknown as AnyAction)
    }

  
    const handleFormSubmission = async (code: string) => {
        try {
            await ProductAuthService.verifyProd(code)
            Alert.alert("SUCCESS", "Product is authentic")
        } catch (error: any) {
          if(error.response.status === 400) Alert.alert("ERROR", error.response.data)

          else  Alert.alert("ERROR", "Unexpected error")
            
        }
    }
   
   
    return (  
            <AnimatedContainer
            style={{
                top
            }}
            >
            {showingMap && <Cancel onPress={() => setShowingMap(false)}>
            <AntDesign name="close" size={30} color="red" />
            </Cancel>}
            <SubContainer>
            {showingMap && <Map companyname='Test Company'/>}
            <CloseContainer>
            <CloseButton onPress={handleModalClose}/>
            </CloseContainer>
            <Banner source={{uri: selectedBrand?.imageurl}} />
            <Content>
          <Form
            initialValues={{
                code: ""
            }}
            validationSchema={validationSchema}
            onSubmit={values => handleFormSubmission(values.code as string)
            }
           isKeyBoardAvoidingNeeded={true}
            >
        <>
        <AppTextInput
        label='Enter product code'
        name='code'
        />
        <SubmitButton text='Verify Product' />
        </>
        </Form>
        <ContentContainer>
        <DetailHeader>Details</DetailHeader>
        <DetailContainer>
        <Details>
        {selectedBrand?.detail}
        </Details>
        <DetailHeader>Contact</DetailHeader>
        <Details>0550103718</Details>
       <Touchable onPress={() => setShowingMap(true)}>
        <ViewUsText>View us on map</ViewUsText>
       </Touchable>
        </DetailContainer> 
      </ContentContainer>
      </Content>
      </SubContainer>
      </AnimatedContainer>
    );
}
 
export default ProductVerificationModal;

const Container = styled.View`
 width: 100%;
 height: 100%;
 background: white;
 position: absolute;
 left: 0;
 z-index: 120;
 border-top-left-radius: 20px;
 border-top-right-radius: 20px;
 box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
`

const Content = styled.View`
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
`


const AnimatedContainer = Animated.createAnimatedComponent(Container)
const CloseContainer = styled.View`
 width: 100%;
 align-items: center;
 justify-content: center;
 position: absolute;
 top: 20px;
 z-index: 110;
`

const Banner = styled.Image`
 width: 100%;
 height: 300px;
 border-top-left-radius: 20px;
 border-top-right-radius: 20px;
`
const ContentContainer = styled.View`
 width: 100%;
 height: 400px;
 border-radius: 10px;
 background: white;
 margin-top: -60px
`

const CloseButton = styled.TouchableOpacity`
  width: 100px;
  height: 5px;
  background: #d3d3d3;
  border-radius: 10px;
`


const DetailHeader = styled.Text`
    color: rgba(0, 0, 0, 0.8);
    margin-left: 20px;
    margin-top: 30px;
    font-size: 18px;
    font-weight: 600
`

const Details = styled.Text`
    font-weight: 300;
    margin-left: 20px;
    margin-top: 10px;
    width: 290px;
    font-size: 14px;
    line-height: 20px;
    color: #444444
`

const DetailContainer = styled.View`
flex-direction: column;
width: 210px;
`



const ViewUsText = styled.Text`
 font-size: 16px;
 margin-left: 20px;
 margin-top: 20px;
 color: #fd3a5c
`


const Touchable = styled.TouchableOpacity`
`

const Cancel = styled.TouchableOpacity`
width: 40px;
height: 40px;
position: absolute;
top: 10px;
right: 20px;
z-index: 150;
align-items: center;
justify-content: center;
background: white;
border-radius: 7px;
`

const SubContainer = styled.ScrollView`
 flex: 1
`