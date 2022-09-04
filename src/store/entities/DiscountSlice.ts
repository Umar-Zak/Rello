import { createSlice } from "@reduxjs/toolkit";
import {DiscountInterface, SubscribedDiscount} from "../../models/DTOS"
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
    subscribedDiscounts: DiscountInterface[]
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

        subribeToDiscountCard: (state: DiscountSlice, action: AddDiscount) => {
            const discountCard = state.subscribedDiscounts.find((dis) => dis._id === action.payload._id)
            if(!discountCard)   state.subscribedDiscounts.push(action.payload)
            state.discounts = state.discounts.filter(discount => discount._id !== action.payload._id)
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
   const selelectedDiscount = subscribedDiscounts.find(discount => discount._id === body._id)
   if(selelectedDiscount) return

    dispatch(startLoader())
    const subscribedDiscount = await DiscountService.createDiscount(body)
    if(!subscribedDiscount) return dispatch(stopLoader())
    
    dispatch(subribeToDiscountCard(subscribedDiscount))
    dispatch(stopLoader())
}


export default slice.reducer

export const {selectDiscount, addBugs, subribeToDiscountCard, getDiscounts} = slice.actions