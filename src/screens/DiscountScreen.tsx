import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import "styled-components"
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import DiscountCard from '../components/DiscountCard';
import SearchField from '../components/SearchField';
import { getDiscounts } from '../models/StaticContent';
import DiscountModa from '../components/DiscountModal';


function DiscountScreen() {
    const discounts = getDiscounts()

    return (
       <Root>
        <DiscountModa/>
        <Container>
        <SearchField 
        placeholder="Search discount cards"
        handleSearch={(text: string) => Alert.alert(text)}
        />
        {
            discounts.map((discount, index) => (
              <DiscountContainer key={index}>
                  <DiscountCard  {...discount} />
              </DiscountContainer>
            ))
        }
        </Container>
       </Root>
   
    );
}

export default DiscountScreen;

const Root = styled.View`
    flex: 1;
    color: white;
`

const Container = styled.ScrollView`
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`

const DiscountContainer = styled.View`
    align-items: center;
    margin-bottom: 30px;
    padding-left: 10px;
`

