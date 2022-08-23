import { createSlice } from "@reduxjs/toolkit";


type AuthSlice = {
    user: boolean
}

const slice = createSlice({
    name: "auth",
    initialState: {
        user: false

    },
    reducers: {
        activateUser: (state: AuthSlice) => {
            state.user = true
        },
        logoutUser: (state: AuthSlice) => {
            state.user = false
        }
    }
})

export default slice.reducer
export const {logoutUser, activateUser} = slice.actions