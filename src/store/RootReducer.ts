import { combineReducers } from "redux";
import entitiesReducer from "./entities/reducer"
import uiReducer from "./ui/UI"
export default combineReducers({
    entities: entitiesReducer,
    ui: uiReducer
})