import  React, {useState} from 'react';
import { AnyAction } from 'redux';
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
import {loadPromotions} from "../store/entities/PromotionSlice"
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import FlatList from '../components/FlatList';
const PromotionsScreen = () => {
    const [refreshing, setRefreshing] = useState(false)
    let promotions = useAppSelector(({entities: {promotion}}) => promotion.promotions)
    const dispatch = useAppDispatch()
    const [searchText, setSearchText] = useState("")
    
    const handleRefresh = async() => {
        setRefreshing(true)
        await dispatch(loadPromotions() as unknown as AnyAction)
        setRefreshing(false)
    }


    
    promotions = promotions.filter(promo => promo.promotion.toLowerCase().startsWith(searchText.toLowerCase()))



    return (
        <Container>
            <SearchField
                handleSearch={(text) => setSearchText(text)}
                placeholder="Search for promotion"
            />
        <FlatList
        data={promotions}
        handleRefresh={handleRefresh}
        refreshing={refreshing}
        type="promo"
        />
        </Container>
    )
}
 
export default PromotionsScreen;

const Container = styled.View`
 flex: 1;
 padding: 20px;
`
