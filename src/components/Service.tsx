import * as React from 'react';
import styled from 'styled-components/native';
import { Alert, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../config/Colors';


interface ServiceComponentInterface {
    image: ImageSourcePropType
    title: string
    redirectUrl?: string
    onPress?: () => void
}

const Service = ({image,redirectUrl,title, onPress}: ServiceComponentInterface) => {
    const navigation = useNavigation()

    const handleServiceTapped = (redirectUrl?: string) => {

        if(onPress) return onPress()

      if(!redirectUrl) return Alert.alert("INFO", "Coming soon")

      navigation.navigate(redirectUrl as unknown as never)
    }

    return ( 
         <Container onPress= {() => handleServiceTapped(redirectUrl)}>
            <SubContainer resizeMode="cover" source={image}>
             </SubContainer>
             <ServiceText numberOfLines={2}>{title}</ServiceText>
         </Container>
     );
}
 
export default Service;

const Container = styled.TouchableOpacity`
// background: red;
align-items: center;
width: 130px;
`

const SubContainer = styled.ImageBackground`
 width: 130px;
 height: 130px;
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
text-align: center;
width: 90%;
margin-left: auto;
margin-right: auto;
`