import React, {ReactElement} from "react";
import "styled-components"
import styled from "styled-components/native"
import Activity from "../components/Activity";
import {useAppSelector } from "../hooks/CustomReduxHooks";

interface AuthFormProps {
    children: ReactElement
    title: string
}


function AuthForm({children, title}: AuthFormProps) {
    const isLoading = useAppSelector(({ui}) => ui.isLoading)
    
    
    return (
     <Container>
        <Banner>
            <Title>{title}</Title>
        </Banner>
        <ContentContainer>
        <Underlay/>
        <FormContainer>
            {children}
        </FormContainer>
        </ContentContainer>
        {isLoading && <Activity/>}
     </Container>
    );
}

const Banner = styled.View`
 width: 100%;
 height: 25%;
 background-color: #97CBEC;
 border-bottom-left-radius: 100px;
 align-items:center;
 justify-content: center;
`

const Container = styled.View`
flex: 1;
background: white;
`
const ContentContainer = styled.View`
 width: 100%;
 height: 75%;
`

const FormContainer = styled.View`
width: 100%;
 height: 100%;
 background-color: white;
 position: absolute;
 z-index: 100;
 border-top-right-radius: 70px;
 padding-left: 20px;
 padding-right: 20px;
 padding-top: 50px;
`

const Underlay = styled.View`
 width: 100%;
 height: 100%;
 background-color: #97CBEC;
`

const Title = styled.Text`
color: white;
font-weight: 600;
letter-spacing: 1px;
font-size: 26px;
`

export default AuthForm;