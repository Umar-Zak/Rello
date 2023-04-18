import React from "react";
import "styled-components"
import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons"
import Colors from "../config/Colors"


interface SearchFieldInterface {
 placeholder: string,
 handleSearch: (searchText: string) => void
}

function SearchField(props: SearchFieldInterface) {
    return (
        <Container>
        <Feather name="search" size={20} color={Colors.dark_grey} />
        <SearchInputField 
            autoCapitalize="none" 
            placeholder={props.placeholder}
            onChangeText={(text: string) => props.handleSearch(text)}
        />
        </Container>
    );
}

export default SearchField;

const SearchInputField = styled.TextInput`
    color: ${Colors.deep_green};
    font-size: 16px;
    width: 80%;
    margin-left: 10px;
    height: 100%;
`

const Container = styled.View`
width: 100%;
height: 40px;
padding-left: 20px;
padding-right: 20px;
padding: 10px;
border-radius: 7px;
background: #eaedf0;
margin-bottom: 40px;
box-shadow: 0 7px 15px rgba(0, 0, 0, 0.14);
flex-direction: row;
align-items: center;
`