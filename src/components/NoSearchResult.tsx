import React from "react";
import "styled-components"
import styled from "styled-components/native";
function NoSearchResult({text}: {text?: string}) {
    return (
       <Container>
        <Text>
           {text? text : "No results"}
        </Text>
       </Container>
    );
}

export default NoSearchResult;

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const Text = styled.Text`
    
`