import {useEffect} from 'react'
import { useDispatch, Provider} from 'react-redux';
import store from './src/store/Store';
import { useRequireLocationPermisssion } from './src/hooks/UseLocation';
import RootNavigation from './src/navigation/RootNavigation';
import {getDiscounts} from "./src/store/entities/DiscountSlice"
import {getGiftCards} from "./src/store/entities/GiftSlice"
import {getLoyalty} from "./src/store/entities/LoyaltySlice"
import {getDiscounts as allDiscount, getGiftCards as allGiftCards, getLoyalties as allLoyalties} from "./src/models/StaticContent"

export default function App() {
  // const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(getDiscounts(allDiscount()))
    // dispatch(getGiftCards(allGiftCards()))
    // dispatch(getLoyalty(allLoyalties()))
    useRequireLocationPermisssion()
  }, [])
  
  return (
  <Provider store={store} >
    <RootNavigation/>
  </Provider>

    
      )
}

 