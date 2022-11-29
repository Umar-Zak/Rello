import React, {useState} from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import "styled-components"
import styled from 'styled-components/native';
import { AnyAction } from 'redux';
import { useSelector, useDispatch} from 'react-redux';
import DiscountCard from '../components/DiscountCard';
import SearchField from '../components/SearchField';
import DiscountModa from '../components/DiscountModal';
import NoSearchResult from '../components/NoSearchResult';
import { DiscountInterface } from '../models/DTOS';
import Overlay from '../components/Overlay';
import {loadDiscountCards} from "../store/entities/DiscountSlice"

const height = Dimensions.get("window").height

function DiscountScreen() {
    const dispatch = useDispatch()
    let discounts = useSelector<any, DiscountInterface[]>((state: any) => state.entities.discount.discounts)
    const [searchText, setSearchText] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    discounts = discounts.filter((discount) => discount.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
    
    const handleRefreshing = () => {
        setRefreshing(true)
        dispatch(loadDiscountCards() as unknown as AnyAction)

        setTimeout(() => {
            setRefreshing(false)
        }, 4000)
    }


    return (
       <Root>
        <DiscountModa/>
        <Container>
        <SearchField 
        placeholder="Search discount cards"
        handleSearch={(text: string) => setSearchText(text)}
        />
        <SubContainer
         
         refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={handleRefreshing}
            />
         }
         showsVerticalScrollIndicator={false}
        >
            <DiscountContainer >
        {
            discounts.map((discount, index) => (
                  <DiscountCard key={index} {...discount} />
            ))
        }
        </DiscountContainer>
        {
           (discounts.length === 0) && <NoSearchResult/>
        }
        <Overlay/>
        </SubContainer>
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
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`

const SubContainer = styled.ScrollView`
 height: ${height}px
 padding-top: 30px;
`

const DiscountContainer = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-around;
flex-wrap: wrap;
`

