import  React, {useState} from 'react';
import {RefreshControl} from "react-native"
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
const PromotionsScreen = () => {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 4000)
    }
    return (
        <Container>
            <SearchField
                handleSearch={() => console.log("searching")}
                placeholder="Search for promotion"
            />
            <SubContainer
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                />
            }
            showsVerticalScrollIndicator={false}
            >
                <PromotionsContainer>
                <Pressable>
                <Promotion source={require("../assets/amari-loyalty.png")}/>
                </Pressable>
                <Pressable>
                <Promotion source={require("../assets/allied-loyalty.png")}/>
                </Pressable>
                </PromotionsContainer>
            </SubContainer>
        </Container>
    )
}
 
export default PromotionsScreen;

const Container = styled.View`
 flex: 1;
 padding: 20px;
`
const Pressable = styled.TouchableOpacity`

`
const Promotion = styled.ImageBackground`
 width: 150px;
 height: 100px;
 border-radius: 15px;
 background: white;
 margin-bottom: 10px;
 overflow: hidden;
`

const PromotionsContainer = styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 flex-wrap: wrap;
`

const SubContainer = styled.ScrollView`
 padding-top: 50px;
`

