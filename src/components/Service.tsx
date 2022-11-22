import * as React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../config/Colors';


interface ServiceComponentInterface {
    image: string
    title: string
    redirectUrl?: string
}

const Service = ({image,redirectUrl,title}: ServiceComponentInterface) => {
    const navigation = useNavigation()

    const handleServiceTapped = (redirectUrl?: string) => {
      if(!redirectUrl) return Alert.alert("INFO", "Coming soon")

      navigation.navigate(redirectUrl as unknown as never)
    }

    return ( 
         <Container onPress= {() => handleServiceTapped(redirectUrl)}>
            <SubContainer source={image}>

             </SubContainer>
             <ServiceText>{title}</ServiceText>
         </Container>
     );
}
 
export default Service;

const Container = styled.TouchableOpacity`
`

const SubContainer = styled.ImageBackground`
 width: 150px;
 height: 150px;
 border-radius: 20px;
 background: white;
 box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25)
 overflow: hidden;
`

const ServiceText = styled.Text`
color: ${Colors.deep_green}
font-weight: 500;
font-size: 15px;
letter-spacing: 1px;
margin-top: 10px;
margin-left: 10px;
`