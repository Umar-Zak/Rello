import { createSlice } from "@reduxjs/toolkit";
import Auth, { UserProfile } from "../../services/Auth";


type AuthSlice = {
    user: boolean,
    userProfile: UserProfile | null | {}
}

type SeedProfileAction = {
    type: string,
    payload: UserProfile
}

const slice = createSlice({
    name: "auth",
    initialState: {
        user: false,
        userProfile: {}

    },
    reducers: {
        activateUser: (state: AuthSlice) => {
            state.user = true
        },
        logoutUser: (state: AuthSlice) => {
            state.user = false
        },

    seedUserProfile: (state: AuthSlice, action: SeedProfileAction) => {
        state.userProfile = action.payload
    }
    }
})

export default slice.reducer

export const loadUserProfile = () => async (dispatch: any, getState: any) => {
    const userProfile = await Auth.getUserProfile()
    
    dispatch(seedUserProfile(userProfile))
}
export const {logoutUser, activateUser, seedUserProfile} = slice.actions