import { combineReducers } from "redux";
import discountReducer from "./DiscountSlice"


export default combineReducers({
    discount:  discountReducer
})