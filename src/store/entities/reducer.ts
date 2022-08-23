import { combineReducers } from "redux";
import discountReducer from "./DiscountSlice"
import giftReducer from "./GiftSlice"
export default combineReducers({
    discount:  discountReducer,
    gift: giftReducer
})