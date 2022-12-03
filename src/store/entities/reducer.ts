import { combineReducers } from "redux";
import discountReducer from "./DiscountSlice"
import giftReducer from "./GiftSlice"
import loyaltyReducer from "./LoyaltySlice"
import promotionReducer from "./PromotionSlice"

export default combineReducers({
    discount:  discountReducer,
    gift: giftReducer,
    loyalty: loyaltyReducer,
    promotion: promotionReducer
})