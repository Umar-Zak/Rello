import React, {useState} from 'react';
import "styled-components"
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
import Colors from '../config/Colors';
import Activity from '../components/Activity';
import ErrorModal from '../components/ErrorModal';
import { useAppSelector , useAppDispatch} from '../hooks/CustomReduxHooks';
import FlatList from '../components/FlatList';
import { loadSubscribedDiscounts } from '../store/entities/DiscountSlice';
import { AnyAction } from 'redux';
import { loadSubscribedLoyalties } from '../store/entities/LoyaltySlice';



 

function WalletScreen() {
    const dispatch = useAppDispatch()
    let subscribedDiscounts = useAppSelector(({entities: {discount}}) => discount.subscribedDiscounts)
    let subscribedGiftCards = useAppSelector(({entities: {gift}}) => gift.subscribedGiftCards)
    let subscribedLoyaltyCards = useAppSelector(({entities: {loyalty}}) => loyalty.subscribedLoyalties)
    const showingErrorModal = useAppSelector(({ui}) => ui.showErrorModal)
    const errorMessage = useAppSelector(({ui}) => ui.errorMessage)
    const isLoading = useAppSelector(({ui}) =>  ui.isLoading)
    const [refreshing, setRefreshing] = useState(false)
    
    const [searchText, setSearchText] = useState("")
    const [activeTab, setActiveTab] = useState(0)
    
    
    switch (activeTab) {
        case 0:
            subscribedLoyaltyCards = subscribedLoyaltyCards.filter(loyaltyCard => loyaltyCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            break
        case 1:
            subscribedDiscounts = subscribedDiscounts.filter(discountCard => discountCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            break
        // case 2:
        //     subscribedGiftCards = subscribedGiftCards.filter(giftCard => giftCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
        //     break
        
        default:
            subscribedLoyaltyCards = subscribedLoyaltyCards.filter(loyaltyCard => loyaltyCard.companyname.toLowerCase().startsWith(searchText.toLowerCase()))
            
    }
    
    
    const handleRefresh = async() => {
        setRefreshing(true)
        await dispatch(loadSubscribedDiscounts() as unknown as AnyAction)
        await dispatch(loadSubscribedLoyalties() as unknown as AnyAction)
        setRefreshing(false)
    }

    return (
         <RootView>
           {showingErrorModal && <ErrorModal message={errorMessage} />}
        {isLoading && <Activity/>}
      <Container>
        <SearchField 
        placeholder="Search through your wallet" 
        handleSearch={(text: string) => setSearchText(text)} 
        />
        <FlexContainer>
        {
            icons.map((icon, index) => (
                <Tab 
                onPress={() => setActiveTab(index)}
                key={index} 
                >
                <TabText>{icon.text}</TabText>
                {index === activeTab && <UnderScore  />}
                </Tab>
            ))
        }
         </FlexContainer>
         {activeTab === 1 && <FlatList 
         isCardInWallet={true}
         data={subscribedDiscounts}
         type="discount"
         refreshing={refreshing}
         handleRefresh={handleRefresh}
         />}
         {activeTab === 0 && <FlatList 
         isCardInWallet={true}
         data={subscribedLoyaltyCards}
         type="loyalty"
         refreshing={refreshing}
         handleRefresh={handleRefresh}
         />}
      </Container>
      </RootView>
    );
}

export default WalletScreen;

const Container = styled.View`
    flex: 1;
    padding: 20px;
`

const RootView = styled.View`
flex: 1
`
const FlexContainer = styled.View`
 flex-direction: row;
 align-items: center;
 margin-bottom: 30px;
`

const Tab = styled.TouchableOpacity`
    width: 50%;
    align-items: center;
    justify-content: center;
    `

    const TabText = styled.Text`
    margin-top: 5px;
    font-size: 14px;
    color: ${Colors.dark_grey};
    `


    const UnderScore = styled.View`
     width: 100%;
     height: 3px;
     margin-top: 5px;
     background-color: ${Colors.green};
     border-radius: 15px;
    `

const icons = [
    {
        text: "Loyalties",
        icon: <MaterialIcons size={35} color="white" name='loyalty' />
    },
    // {
    //     text: "Gifts",
    //     icon: <AntDesign size={35} color={Colors.green} name='gift' />
    // },
    {
        text: "Discounts",
        icon: <AntDesign size={35} color="white" name='shoppingcart' />
    }
]
