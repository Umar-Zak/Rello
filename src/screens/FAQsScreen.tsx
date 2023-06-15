import * as React from 'react';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import { getAllFaqs } from '../models/StaticContent';

const FAQsScreen = () => {
    const faqs = getAllFaqs()
    return (
    <Container contentContainerStyle={{
       padding: 20,
       paddingTop: 40
    }}>
      <SubContainer>
      {
        faqs.map((faq, index) => (
            <FaqComponent key={index}>
            <Question>{faq.question}</Question>
            <Answer>{faq.answer}</Answer>
            </FaqComponent>
        ))
       }
      </SubContainer>
    </Container>
    );
}
 
export default FAQsScreen;

const Container = styled.ScrollView`
 flex: 1;
 
`

const SubContainer = styled.View`
 width: 100%;
 max-width: 700px;
 margin-left: auto;
 margin-right: auto;
`

const FaqComponent = styled.View`
 width: 100%;
 margin-bottom: 40px;
`

const Question = styled.Text`
font-size: 17px;
max-width: 300px;
margin-bottom: 10px;
font-weight: 600;
color: ${Colors.deep_green}
`

const Answer = styled.Text`
font-size: 14px;
max-width: 390px;
line-height: 19px;
color: rgba(0, 0, 0, 0.6)
`