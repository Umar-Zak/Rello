import React from 'react';
import "styled-components"
import styled from 'styled-components/native';
import Screen from '../components/Screen';



function WalletDetailScreen() {
    return (
       <Container 
       >
        <Screen>
            <>
            <SubContainer>

            </SubContainer>
            </>
        </Screen>
       </Container>
    );
}

export default WalletDetailScreen;

const Container = styled.ScrollView`
    padding-top: 70px;
    padding-bottom: 20px;
`

const SubContainer = styled.View`
    width: 90%;
    height: 400px;
    background: white;
    border-radius: 20px;
    margin-left: 5%;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);

`