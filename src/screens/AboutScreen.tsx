import * as React from 'react';
import styled from 'styled-components/native';
import * as Application from 'expo-application';
import Colors from '../config/Colors';
const AboutScreen = () => {
    return ( 
        <Container>
            <SubContainer
            contentContainer={{
                paddingBottom: 30
            }}
            >
            <Title>Get the best of Corral {Application.nativeApplicationVersion}</Title>
                <Text>
                Getting best deals on your purchases never got easier!!
                 Download Corral and Get great value on purchases
                 made at various stores and restaurants.
                Join this exclusive club of shoppers for great 
                benefits such as Discounts on purchases and Loyalty Rewards as a customer.
                You can also buy and Gift shopping vouchers to loved ones. 
                And guess what? You don’t have to worry about carrying around all 
                those bulky cards. With Corral app, all your cards are safe on your mobile phone.
                </Text>
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