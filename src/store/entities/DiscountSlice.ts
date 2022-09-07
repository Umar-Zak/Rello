import { createSlice } from "@reduxjs/toolkit";
import {DiscountInterface, SubscribedDiscount} from "../../models/DTOS"
import { UserProfile } from "../../services/Auth";
import DiscountService from "../../services/DiscountService";
import {startLoader, stopLoader} from "../ui/UI"
type AddDiscount = {
    type: string
    payload: DiscountInterface
}


type GetDiscountsAction = {
    type: string,
    payload: DiscountInterface[]
}

type DiscountSlice = {
    discounts: DiscountInterface[],
    selectedDiscount: DiscountInterface | null,
    subscribedDiscounts: SubscribedDiscount[]
}


 const slice = createSlice({
    initialState: {
        discounts: [],
        selectedDiscount: null,
        subscribedDiscounts: []
    },
    name: "bugs",
    reducers:  {
        addBugs: (state: DiscountSlice, action: AddDiscount) => {
            state.discounts.push(action.payload)
        },

        selectDiscount: (state: DiscountSlice, action:AddDiscount ) => {
            state.selectedDiscount = action.payload
            
        },

        subribeToDiscountCard: (state: DiscountSlice, action: {type: string, payload: SubscribedDiscount}) => {
           state.subscribedDiscounts.push(action.payload)
        },

        getSubscriptions: (state: DiscountSlice, action: {type: string, payload: SubscribedDiscount[]}) => {
            state.subscribedDiscounts = action.payload
        },

        getDiscounts: (state: DiscountSlice, action: GetDiscountsAction) => {
            state.discounts = action.payload
        }
    }
})

export const loadDiscountCards = () => async(dispatch: any, getState: any) => {
    dispatch(startLoader())
    
    const discountCards = await DiscountService.getAllDiscountCards()
    
    dispatch(getDiscounts(discountCards))

    dispatch(stopLoader())

}


export const subscribeDiscount = (body: SubscribedDiscount) => async( dispatch: any, getState: any) => {
   const subscribedDiscounts = getState().entities.discount.subscribedDiscounts as DiscountInterface[]
   let selectedDiscount = subscribedDiscounts.find(discount => discount.discountid === body.discountid || discount.merchantcode === body.merchantcode)
   if(selectedDiscount) return 

    dispatch(startLoader())
    try {
        const subscribedDiscount = await DiscountService.createDiscount(body)
        dispatch(subribeToDiscountCard(subscribedDiscount))
        dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
}

export const loadSubscribedDiscounts = () => async (dispatch: any, getState: any) => {
    try {
        dispatch(startLoader())
       const subscriptions = await DiscountService.getSubscribedDiscounts()
       dispatch(getSubscriptions(subscriptions))
       dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
    
}


export default slice.reducer

export const {selectDiscount, addBugs, subribeToDiscountCard, getDiscounts, getSubscriptions} = slice.actions