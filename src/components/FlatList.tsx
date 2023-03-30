import * as React from 'react';
import styled from 'styled-components/native';
import NoSearchResult from './NoSearchResult';
import LoyaltyCard from "./LoyaltyCard"
import { DiscountInterface, LoyaltyInterface, ProductAuth, Promotion } from '../models/DTOS';
import DiscountCard from './DiscountCard';
import PromotionCard from './PromotionCard';
import BrandCard from './BrandCard';


interface FlatlistProps {
    handleRefresh: () => void
    refreshing: boolean
    data: unknown[]
    type: "loyalty" | "discount" | "promo" | "auth"
    isCardInWallet?: boolean
}

const FlatList = ({handleRefresh, isCardInWallet,refreshing, type, data}: FlatlistProps) => {
    return ( 
        <List
        horizontal={false}
        numColumns={2}
        data={data}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={ ({item}) => {
            if(type === "loyalty") return <LoyaltyCard {...item as LoyaltyInterface} isInWallet={isCardInWallet} />

            if(type === "promo") return <PromotionCard {...item as Promotion} />

            if(type === "auth") return <BrandCard {...item as ProductAuth} />

            return <DiscountCard {...item as DiscountInterface} isInWallet={isCardInWallet} />
        }}
        keyExtractor={(item: unknown, index: number) => item._id}
        columnWrapperStyle={{
         justifyContent: "center"
        }}
        ListEmptyComponent={NoSearchResult}
        />
     );
}
 
export default FlatList;

const List = styled.FlatList`

`