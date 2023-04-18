import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./RootReducer"
const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: false
    })]
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch