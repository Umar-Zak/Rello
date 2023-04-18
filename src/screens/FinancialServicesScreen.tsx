import React, {useState} from 'react';
import styled from 'styled-components/native';
import FlatList from '../components/FlatList';
import SearchField from '../components/SearchField';

const FinancialServicesScreen = () => {
    const [searchText, setSearchText] = useState("")
    const financialServices = [require("../assets/f-s-1.png"), require("../assets/f-s-2.png")]
    return ( 
        <Container>
            <SearchField 
            placeholder='Search through our services'
            handleSearch={() => setSearchText(searchText)}
             />
             <FlatList
             data={financialServices}
             refreshing={false}
             type="f_services"
             handleRefresh={() => console.log("")}
             />
        </Container>
     );
}
 
export default FinancialServicesScreen;

const Container = styled.View`
 flex: 1
 padding-left: 20px;
 padding-right: 20px
 padding-top: 20px;
`