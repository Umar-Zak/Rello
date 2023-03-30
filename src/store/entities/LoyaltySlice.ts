import type { LoyaltyTransaction, LoyalRedemption, LoyaltyInterface, SubsribedLoyalty } from './../../models/DTOS';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LoyaltyService from "../../services/LoyaltyService";
import {hideErrorModal, showErrorModal, startLoader, stopLoader } from "../ui/UI";
import { AppDispatch, RootState } from '../Store';


type LoyaltySlice = {
    loyalties: LoyaltyInterface[],
    selectedLoyalty: LoyaltyInterface
    subscribedLoyalties: SubsribedLoyalty[],
    loyaltyTransactions: LoyaltyTransaction[],
    redeemedLoyalties: LoyalRedemption[]
}

const Placeholder: LoyaltyInterface[] = []

const slice = createSlice({
    name: "loyalty",
    initialState: {
        loyalties: [],
        selectedLoyalty: Placeholder[0],
        subscribedLoyalties: [],
        loyaltyTransactions: [],
        redeemedLoyalties: []
    } as LoyaltySlice,

    reducers: {

        addLoyalty: (state, action: PayloadAction<LoyaltyInterface>) => {
            state.loyalties.push(action.payload)
        },

        selectLoyalty: (state, action: PayloadAction<LoyaltyInterface>) => {
            state.selectedLoyalty = action.payload
            
        },

        subscribeToLoyaltyCard: (state, action: {type: string, payload: SubsribedLoyalty}) => {
            state.subscribedLoyalties.push(action.payload)
        },

        getLoyalty: (state, action: PayloadAction<LoyaltyInterface[]>) => { 
            state.loyalties = action.payload
        },

        getSubscriptions: (state, action: {type: string, payload: SubsribedLoyalty[]}) => {
            state.subscribedLoyalties = action.payload
        },

        initializeLoyaltyTransaction: (state, action: PayloadAction<LoyaltyTransaction[]>) => {
            state.loyaltyTransactions = action.payload
        },

        initializeRedeemedLoyalties: (state, action: PayloadAction<LoyalRedemption[]>) => {
            state.redeemedLoyalties = action.payload
        }
    }
})

export const loadRedeemedLoyalties = () => async(dispatch: AppDispatch, getState: () => RootState) => {

    try {
       // Implementation coming soon: Reason is, endpoint isn't built yet. An oversight.
        
    } catch (error) {
        
    }
}


export const loadLoyaltyCards = () => async(dispatch: AppDispatch, getState: () => RootState) => {
    try {
    dispatch(startLoader())
    const loyaltyCards = await LoyaltyService.getAllLoyaltyCards()
    dispatch(getLoyalty(loyaltyCards))

    dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
}


export const createSubscription = (body: SubsribedLoyalty) => async (dispatch: AppDispatch, getState: () => RootState) => {
    //    The below lines of code where commented because the logic changed.
    // We revert to it in the future; for now, it's not needed.
    // const subscribedLoyalties = getState().entities.loyalty.subscribedLoyalties as SubsribedLoyalty[]
    
    // let selectedLoyalty = subscribedLoyalties.find(loyalty => loyalty.loyaltyid === body.loyaltyid)
    // if(selectedLoyalty) return

    // selectedLoyalty = subscribedLoyalties.find(loyalty => loyalty.merchantcode === body.merchantcode)
    // if(selectedLoyalty) {
    //      dispatch(showErrorModal("You already have a subscription from this merchant"))
    //     setTimeout(() => {
    //         dispatch(hideErrorModal())
    //     }, 1200)
    //      return
    // }

    try {
        dispatch(startLoader())
        const subscription = await LoyaltyService.createLoyalty(body)
        dispatch(subscribeToLoyaltyCard(subscription))
        dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
        dispatch(showErrorModal("Could not subscribe to loyalty card"))
    }

}


export const loadSubscribedLoyalties = () => async(dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(startLoader())
        const subscriptions = await LoyaltyService.getSubscriptions()
        dispatch(getSubscriptions(subscriptions))
        dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
}

export const loadLoyaltyTransactions = () => async(dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const transactions = await LoyaltyService.getCustomerLoyaltyTransaction()
      dispatch(initializeLoyaltyTransaction(transactions))
      
    } catch (error) {
        dispatch(showErrorModal("An error occured connecting to the server"))
        setTimeout(() => {
            dispatch(hideErrorModal())
        }, 1200)
      
    }
}

export default  slice.reducer

export const {addLoyalty, selectLoyalty, subscribeToLoyaltyCard, getLoyalty, getSubscriptions, initializeLoyaltyTransaction, initializeRedeemedLoyalties} = slice.actions
