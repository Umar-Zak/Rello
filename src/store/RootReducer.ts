import { combineReducers } from "redux";
import entitiesReducer from "./entities/reducer"
import uiReducer from "./ui/UI"
import authReducer from "./auth/AuthSlice"
export default combineReducers({
    entities: entitiesReducer,
    ui: uiReducer,
    auth: authReducer
})