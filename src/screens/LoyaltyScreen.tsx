import React, {useState} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import {useSelector} from "react-redux"
import LoyaltyCard from '../components/LoyaltyCard';
import NoSearchResult from '../components/NoSearchResult';
import SearchField from '../components/SearchField';
import { LoyaltyInterface } from '../models/DTOS';
import Overlay from '../components/Overlay';


function LoyaltyScreen() {
    let loyalties = useSelector<any, LoyaltyInterface[]>((state: any) => state.entities.loyalty.loyalties)
    const [searchText, setSearchText] = useState("")
    
    loyalties = loyalties.filter(loyalty => loyalty.companyname.toLowerCase().startsWith(searchText.toLowerCase()))

    return (
    <Container>
        <SearchField 
        placeholder="Search loyalty cards" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
       <SubContainer>
       {
            loyalties.map((loyalty, index) => (
               <LoyaltyContainer key={index}>
                 <LoyaltyCard {...loyalty} />
               </LoyaltyContainer>
            )
              
            )
        }
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
    align-items: center;
    padding-left: 20px;
`