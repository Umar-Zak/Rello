import { createSlice } from "@reduxjs/toolkit";
import { LoyaltyInterface } from "../../models/DTOS";


type LoyaltySlice = {
    loyalties: LoyaltyInterface[],
    selectedLoyalty: LoyaltyInterface | null,
    subscribedLoyalties: LoyaltyInterface[]
}


type LoyaltyAction = {
    type: string
    payload: LoyaltyInterface
   
}

type GetLoyaltyAction = {
    type: string
    payload: LoyaltyInterface[]
}


const slice = createSlice({
    name: "loyalty",
    initialState: {
        loyalties: [],
        selectedLoyalty: null,
        subscribedLoyalties: []
    },

    reducers: {

        addLoyalty: (state: LoyaltySlice, action: LoyaltyAction) => {
            state.loyalties.push(action.payload)
        },

        selectLoyalty: (state: LoyaltySlice, action: LoyaltyAction) => {
            state.selectedLoyalty = action.payload
            
            
        },

        subscribeToLoyaltyCard: (state: LoyaltySlice, action: LoyaltyAction) => {
            const loyaltyCard = state.subscribedLoyalties.find((loy) => loy.id)
            if(!loyaltyCard) state.subscribedLoyalties.push(action.payload)

            state.loyalties = state.loyalties.filter(loyalty => loyalty.id !== action.payload.id)
        },

        getLoyalty: (state: LoyaltySlice, action: GetLoyaltyAction) => {
            state.loyalties = action.payload
        }
    }
})



export default  slice.reducer

export const {addLoyalty, selectLoyalty, subscribeToLoyaltyCard, getLoyalty} = slice.actions
