import React, {useState} from 'react';
import {RefreshControl} from "react-native"
import "styled-components"
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import {useSelector, useDispatch} from "react-redux"
import LoyaltyCard from '../components/LoyaltyCard';
import NoSearchResult from '../components/NoSearchResult';
import SearchField from '../components/SearchField';
import { LoyaltyInterface } from '../models/DTOS';
import Overlay from '../components/Overlay';
import {loadLoyaltyCards} from "../store/entities/LoyaltySlice"


function LoyaltyScreen() {
    const dispatch = useDispatch()
    let loyalties = useSelector<any, LoyaltyInterface[]>((state: any) => state.entities.loyalty.loyalties)
    const [searchText, setSearchText] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    loyalties = loyalties.filter(loyalty => loyalty.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
 
    const handleRefresh = () => {
        setRefreshing(true)
        dispatch(loadLoyaltyCards() as unknown as AnyAction)
        setTimeout(() => {
            setRefreshing(false)
        }, 4000)
    }

    return (
    <Container>
        <SearchField 
        placeholder="Search loyalty cards" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
       <SubContainer
       contentContainerStyle={{
        paddingBottom: 80
       }}
       refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefresh}
        />
       }
       >
  <LoyaltyContainer >
        { 
            loyalties.map((loyalty, index) => (
                 <LoyaltyCard key={index} {...loyalty} />
            )
            )
        }
         </LoyaltyContainer>
       
        {
           ( loyalties.length === 0) && <NoSearchResult/>
        }
       </SubContainer>
        <Overlay/>
    </Container>
    );
}

export default LoyaltyScreen;

const Container = styled.View`
    flex: 1;
    padding: 20px;
`

const SubContainer = styled.ScrollView`
  padding-top: 30px;
`

const LoyaltyContainer = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-around;
flex-wrap: wrap;
`