import { combineReducers } from "redux";
import DiscountReducer from "./DiscountSlice"
import GiftReducer from "./GiftSlice"
import LoyaltyReducer from "./LoyaltySlice"
import PromotionReducer from "./PromotionSlice"
import ProductAuthReducer from "./ProductAuthSlice"
export default combineReducers({
    discount:  DiscountReducer,
    gift: GiftReducer,
    loyalty: LoyaltyReducer,
    promotion: PromotionReducer,
    productAuth: ProductAuthReducer
})
