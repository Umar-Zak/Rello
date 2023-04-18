import React, {useState} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import SearchField from '../components/SearchField';
import Overlay from '../components/Overlay';
import {loadLoyaltyCards} from "../store/entities/LoyaltySlice"
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import FlatList from '../components/FlatList';



function LoyaltyScreen() {
    const dispatch = useAppDispatch()
    let loyalties = useAppSelector(({entities: {loyalty}}) => loyalty.loyalties)
    const [searchText, setSearchText] = useState("")
    const [refreshing, setRefreshing] = useState(false)


    loyalties = loyalties.filter(loyalty => loyalty.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
   
    const handleRefresh = async () => {
        setRefreshing(true)
        await dispatch(loadLoyaltyCards() as unknown as AnyAction)
        setRefreshing(false)
    }

    return (
    <Container>
        <SearchField 
        placeholder="Search loyalty cards by shop name" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
       <FlatList
       data={loyalties}
       refreshing={refreshing}
       handleRefresh={handleRefresh}
       type="loyalty"
       />
        <Overlay/>
    </Container>
    );
}

export default LoyaltyScreen;

const Container = styled.View`
    flex: 1;
    padding: 20px;
`


const List = styled.FlatList`

`