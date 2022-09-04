import { createSlice } from "@reduxjs/toolkit";
import { LoyaltyInterface, SubsribedLoyalty } from "../../models/DTOS";
import LoyaltyService from "../../services/LoyaltyService";
import { startLoader, stopLoader } from "../ui/UI";


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
            const loyaltyCard = state.subscribedLoyalties.find((loy) => loy._id === action.payload._id)
            if(!loyaltyCard) state.subscribedLoyalties.push(action.payload)

            state.loyalties = state.loyalties.filter(loyalty => loyalty._id !== action.payload._id)
       
            
        },

        getLoyalty: (state: LoyaltySlice, action: GetLoyaltyAction) => {
            state.loyalties = action.payload
        }
    }
})

export const loadLoyaltyCards = () => async(dispatch: any, getState: any) => {
    dispatch(startLoader())
    const loyaltyCards = await LoyaltyService.getAllLoyaltyCards()
    dispatch(getLoyalty(loyaltyCards))

    dispatch(stopLoader())
}


export const createSubscription = (body: SubsribedLoyalty) => async (dispatch: any, getState: any) => {
    const subscribedLoyalties = getState().entities.loyalty.subscribedLoyalties as LoyaltyInterface[]
    const selectedLoyalty = subscribedLoyalties.find(loyalty => loyalty._id === body._id)
    if(selectedLoyalty) return

    dispatch(startLoader())
    const subscription = await LoyaltyService.createLoyalty(body)
    if(!subscription) return dispatch(stopLoader())

    dispatch(subscribeToLoyaltyCard(subscription))
    dispatch(stopLoader())

}

export default  slice.reducer

export const {addLoyalty, selectLoyalty, subscribeToLoyaltyCard, getLoyalty} = slice.actions
