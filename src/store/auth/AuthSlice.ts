import { AppDispatch, RootState } from './../Store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Auth, { UserProfile } from "../../services/Auth";


type AuthSlice = {
    user: boolean,
    userProfile: UserProfile
}


const Placeholder: UserProfile[] = []

const slice = createSlice({
    name: "auth",
    initialState: {
        user: false,
        userProfile: Placeholder[0]

    } as AuthSlice,
    reducers: {
        activateUser: (state) => {
            state.user = true
        },
        logoutUser: (state) => {
            state.user = false
        },

    seedUserProfile: (state, action: PayloadAction<UserProfile>) => {
        state.userProfile = action.payload
    }
    }
})

export default slice.reducer

export const loadUserProfile = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const userProfile = await Auth.getUserProfile()
    dispatch(seedUserProfile(userProfile))
}
export const {logoutUser, activateUser, seedUserProfile} = slice.actions