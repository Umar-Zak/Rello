import React, {useState} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import SearchField from '../components/SearchField';
import {loadDiscountCards} from "../store/entities/DiscountSlice"
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import FlatList from '../components/FlatList';


function DiscountScreen() {
    const dispatch = useAppDispatch()
    let discounts = useAppSelector(({entities: {discount}}) =>discount.discounts)
    const [searchText, setSearchText] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    
    discounts = discounts.filter((discount) => discount.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
    
    const handleRefreshing = async() => {
        setRefreshing(true)
        await dispatch(loadDiscountCards() as unknown as AnyAction)
        setRefreshing(false)
       
    }


    return (
       <Root>
        <Container>
        <SearchField 
        placeholder="Search discount cards"
        handleSearch={(text: string) => setSearchText(text)}
        />
        <FlatList
          data={discounts}
          handleRefresh={handleRefreshing}
          refreshing={refreshing}
          type="discount"
        />
        </Container>
       </Root>
   
    );
}

export default DiscountScreen;

const Root = styled.View`
    flex: 1;
    color: white;
`

const Container = styled.View`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`


