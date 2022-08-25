import { combineReducers } from "redux";
import discountReducer from "./DiscountSlice"
import giftReducer from "./GiftSlice"
import loyaltyReducer from "./LoyaltySlice"


export default combineReducers({
    discount:  discountReducer,
    gift: giftReducer,
    loyalty: loyaltyReducer
})