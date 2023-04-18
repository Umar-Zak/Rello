import React from "react";
import "styled-components"
import { ActivityIndicator } from "react-native"
import styled from "styled-components/native";



function Activity() {
    return (
       <Container>
        <ActivityIndicator   size="large" color="#2bcec4"/>
       </Container>
    );
}

export default Activity;

const Container = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
`