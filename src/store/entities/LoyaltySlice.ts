import { LoyaltyTransaction } from './../../models/DTOS';
import { createSlice } from "@reduxjs/toolkit";
import { LoyaltyInterface, SubsribedLoyalty } from "../../models/DTOS";
import LoyaltyService from "../../services/LoyaltyService";
import {  hideErrorModal, showErrorModal, startLoader, stopLoader } from "../ui/UI";


type LoyaltySlice = {
    loyalties: LoyaltyInterface[],
    selectedLoyalty: LoyaltyInterface | null,
    subscribedLoyalties: SubsribedLoyalty[],
    loyaltyTransactions: LoyaltyTransaction[]
}

type LoyalTransactionAction = {
    type: string
    payload: LoyaltyTransaction[]
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
        subscribedLoyalties: [],
        loyaltyTransactions: []
    },

    reducers: {

        addLoyalty: (state: LoyaltySlice, action: LoyaltyAction) => {
            state.loyalties.push(action.payload)
        },

        selectLoyalty: (state: LoyaltySlice, action: LoyaltyAction) => {
            state.selectedLoyalty = action.payload
            
        },

        subscribeToLoyaltyCard: (state: LoyaltySlice, action: {type: string, payload: SubsribedLoyalty}) => {
            state.subscribedLoyalties.push(action.payload)
        },

        getLoyalty: (state: LoyaltySlice, action: GetLoyaltyAction) => { 
            state.loyalties = action.payload.filter(loyalty => !loyalty.companyname.toLowerCase().startsWith("mel"))
        },

        getSubscriptions: (state: LoyaltySlice, action: {type: string, payload: SubsribedLoyalty[]}) => {
            state.subscribedLoyalties = action.payload
        },

        initializeLoyaltyTransaction: (state: LoyaltySlice, action: LoyalTransactionAction) => {
            state.loyaltyTransactions = action.payload
        }
    }
})

export const loadLoyaltyCards = () => async(dispatch: any, getState: any) => {
    try {
        dispatch(startLoader())
    const loyaltyCards = await LoyaltyService.getAllLoyaltyCards()
    dispatch(getLoyalty(loyaltyCards))

    dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
}


export const createSubscription = (body: SubsribedLoyalty) => async (dispatch: any, getState: any) => {
   
    const subscribedLoyalties = getState().entities.loyalty.subscribedLoyalties as SubsribedLoyalty[]
    
    let selectedLoyalty = subscribedLoyalties.find(loyalty => loyalty.loyaltyid === body.loyaltyid)
    if(selectedLoyalty) return

    selectedLoyalty = subscribedLoyalties.find(loyalty => loyalty.merchantcode === body.merchantcode)
    if(selectedLoyalty) {
         dispatch(showErrorModal("You already have a subscription from this merchant"))
        setTimeout(() => {
            dispatch(hideErrorModal())
        }, 1200)
         return
    }

    try {
        dispatch(startLoader())
        const subscription = await LoyaltyService.createLoyalty(body)
        dispatch(subscribeToLoyaltyCard(subscription))
        dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }

}


export const loadSubscribedLoyalties = () => async(dispatch: any, getState: any) => {
    try {
        dispatch(startLoader())
        const subscriptions = await LoyaltyService.getSubscriptions()
        dispatch(getSubscriptions(subscriptions))
        dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
}

export const loadLoyaltyTransactions = () => async(dispatch: any, getState: any) => {
    try {
      const transactions = await LoyaltyService.getCustomerLoyaltyTransaction()
      dispatch(initializeLoyaltyTransaction(transactions))
      console.log("DA", transactions);
      
    } catch (error) {
        console.log("LO", error);
        dispatch(showErrorModal("An error occured connecting to the server"))
        setTimeout(() => {
            dispatch(hideErrorModal())
        }, 1200)
      
    }
}

export default  slice.reducer

export const {addLoyalty, selectLoyalty, subscribeToLoyaltyCard, getLoyalty, getSubscriptions, initializeLoyaltyTransaction} = slice.actions
