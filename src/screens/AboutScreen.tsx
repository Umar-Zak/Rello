import * as React from 'react';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
const AboutScreen = () => {
    return ( 
        <Container>
            <SubContainer
            contentContainerStyle={{
                paddingBottom: 50
            }}
            >
            <Title>About Us</Title>
                <Text>
                Welcome to Corral Mobile App! 
                We are excited to offer you a variety of rewards 
                and benefits for your patronage from you favourite retail stores.
                Corral is easy to use, and features a user-friendly 
                interface that showcases various discount, loyalty, and gift card services from multiple merchants.
                </Text>
  
                <SubTitle>Benefits of the app include</SubTitle>
                <Text>
                - Get discount on purchases made with partner stores
                </Text>
                <Text>- Earn points on purchases made with partner stores, and redeem them for a wide range of perks and benefits.</Text>
                <Text>- Purchase gift cards for loved ones. </Text>
                <Text>- Participate in sales competitions to win gifts and prizes</Text>
                <Paragraph>
                In addition to these rewards, Corral also helps customers authenticate 
                products of various manufacturers purchased at retail stores. 
                With Corral, you can easily verify the authenticity of your 
                purchases and ensure that you are getting the high-quality 
                products you paid for and deserve.
                We are dedicated to providing the best possible experience and are constantly 
                updating and improving our app to ensure it meets your needs. 
                </Paragraph>
                <Paragraph>
                So welcome to your new Rewards Partner!
                </Paragraph>
            </SubContainer>
        </Container>
     );
}
 
export default AboutScreen;

const Container = styled.SafeAreaView`
 flex: 1
`

const SubContainer = styled.ScrollView`
 padding-left: 20px;
 padding-right: 20px;
 padding-top: 20px;
`

const Title = styled.Text`
 color: ${Colors.deep_green}
 font-size: 20px;
 margin-top: 30px;
 margin-bottom: 15px;
 font-weight: 700;
 text-transform: capitalize;
 letter-spacing: 1px;
`

const Text = styled.Text`
 font-size: 15px;
 width: 90%;
line-height: 24px;
`

const Paragraph = styled.Text`
font-size: 15px;
 width: 90%;
line-height: 24px;
margin-top: 20px;
`

const SubTitle = styled.Text`
 color: ${Colors.deep_green}
 font-size: 17px;
 margin-top: 30px;
 margin-bottom: 15px;
 font-weight: 500;
 text-transform: capitalize;
 letter-spacing: 1px;   
`