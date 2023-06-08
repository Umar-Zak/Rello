import React from "react";
import "styled-components"
import { ActivityIndicator } from "react-native"
import styled from "styled-components/native";


interface ActivityInterface {
    prompt?:string
}

function Activity({prompt}: ActivityInterface) {
    return (
       <Container>
       <ContentContainer>
       <ActivityIndicator   size="small" color="#2bcec4"/>
       <Text>{prompt ? prompt : "Please wait...."}</Text>
       </ContentContainer>
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
    background: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
`

const ContentContainer = styled.View`
 width: 200px;
 height: 50px;
 flex-direction: row;
 background: white;
 border-radius: 10px;
 align-items: center;
 justify-content: center;
`

const Text = styled.Text`
margin-left: 10px;
`