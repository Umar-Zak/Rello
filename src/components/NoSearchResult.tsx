import React from 'react';
import "styled-components"
import styled from 'styled-components/native';
function NoSearchResult() {
    return (
       <Container>
        <Text>
            No results
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