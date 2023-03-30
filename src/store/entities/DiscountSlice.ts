import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {DiscountInterface, DiscountTransaction, SubscribedDiscount} from "../../models/DTOS"
import DiscountService from "../../services/DiscountService";
import { AppDispatch, RootState } from "../Store";
import {hideErrorModal, showErrorModal, startLoader, stopLoader} from "../ui/UI"



type DiscountSlice = {
    discounts: DiscountInterface[],
    selectedDiscount: DiscountInterface 
    subscribedDiscounts: SubscribedDiscount[],
    discountTransactions: DiscountTransaction[]
}

const Placeholder: DiscountInterface[] = []

 const slice = createSlice({
    initialState: {
        discounts: [],
        selectedDiscount: Placeholder[0],
        subscribedDiscounts: [],
        discountTransactions: []
    } as DiscountSlice,
    name: "discounts",
    reducers:  {
        addDiscount: (state, action: PayloadAction<DiscountInterface>) => {
            state.discounts.push(action.payload)
        },

        selectDiscount: (state, action: PayloadAction<DiscountInterface> ) => {
            state.selectedDiscount = action.payload
            
        },
    
        subribeToDiscountCard: (state, action: {type: string, payload: SubscribedDiscount}) => {
           state.subscribedDiscounts.push(action.payload)
        },

        getSubscriptions: (state, action: {type: string, payload: SubscribedDiscount[]}) => {
            state.subscribedDiscounts = action.payload
        },

        getDiscounts: (state, action: PayloadAction<DiscountInterface[]>) => {
            state.discounts = action.payload
        },

        initializeDiscountTransaction: (state , action: PayloadAction<DiscountTransaction[]>) => {
            state.discountTransactions = action.payload
        }
    }
})

export const loadDiscountCards = () => async(dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoader())
    
    const discountCards = await DiscountService.getAllDiscountCards()
    
    dispatch(getDiscounts(discountCards))

    dispatch(stopLoader())

}


export const subscribeDiscount = (body: SubscribedDiscount) => async( dispatch: AppDispatch, getState: () => RootState) => {
   const subscribedDiscounts = getState().entities.discount.subscribedDiscounts 
   let selectedDiscount = subscribedDiscounts.find(discount => discount.discountid === body.discountid || discount.merchantcode === body.merchantcode)
   if(selectedDiscount) {
     dispatch(showErrorModal("You already have a subscription from this merchant"))

     setTimeout(() => {
        dispatch(hideErrorModal())
     }, 1300)
    return 
   }

    dispatch(startLoader())
    try {
        const subscribedDiscount = await DiscountService.createDiscount(body)
        dispatch(subribeToDiscountCard(subscribedDiscount))
        dispatch(stopLoader())
    } catch (error: any) {
        dispatch(stopLoader())
        dispatch(showErrorModal("Could not subscribe to discount card"))
    }
}

export const loadSubscribedDiscounts = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(startLoader())
       const subscriptions = await DiscountService.getSubscribedDiscounts()
       dispatch(getSubscriptions(subscriptions))
       dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
    
}


export const loadDiscountTransactions = () => async(dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const transactions = await DiscountService.getCustomerDiscountTransactions()
        dispatch(initializeDiscountTransaction(transactions))
    } catch (error) {
        dispatch(showErrorModal("An error occured connecting to server"))
        setTimeout(() => {
        dispatch(hideErrorModal())
     }, 1300)
        
    }
}

export default slice.reducer

export const {selectDiscount, addDiscount, subribeToDiscountCard, getDiscounts, getSubscriptions, initializeDiscountTransaction} = slice.actions