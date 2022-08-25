import React, {useState} from 'react';
import "styled-components"
import styled from 'styled-components/native';
import LoyaltyCard from '../components/LoyaltyCard';
import NoSearchResult from '../components/NoSearchResult';
import SearchField from '../components/SearchField';
import { getLoyalties } from '../models/StaticContent';


function LoyaltyScreen() {
    let loyalties = getLoyalties()
    const [searchText, setSearchText] = useState("")
    
    loyalties = loyalties.filter(loyalty => loyalty.companyname.toLowerCase().startsWith(searchText.toLowerCase()))

    return (
    <Container>
        <SearchField 
        placeholder="Search loyalty cards" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
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
    </Container>
    );
}

export default LoyaltyScreen;

const Container = styled.ScrollView`
    flex: 1;
    padding: 20px;
`

const LoyaltyContainer = styled.View`
    padding-left: 40px;
`