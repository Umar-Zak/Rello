import React from 'react';
import "styled-components"
import styled from 'styled-components/native';
import Colors from "../config/Colors"


interface SearchFieldInterface {
 placeholder: string,
 handleSearch: (searchText: string) => void
}

function SearchField(props: SearchFieldInterface) {
    return (
        <SearchInputField 
      autoCapitalize={false} 
      autoCorrect="none" 
      placeholder={props.placeholder}
      onChangeText={(text: string) => props.handleSearch(text)}
       />
    );
}

export default SearchField;

const SearchInputField = styled.TextInput`
    width: 100%;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    padding: 10px;
    border-radius: 7px;
    background: #eaedf0;
    color: ${Colors.deep_green};
    font-size: 16px;
    margin-bottom: 40px;
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.14);

`