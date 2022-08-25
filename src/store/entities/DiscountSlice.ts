import { createSlice } from "@reduxjs/toolkit";
import {DiscountInterface} from "../../models/DTOS"
 
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
            const discountCard = state.subscribedDiscounts.find((dis) => dis.id)
            if(!discountCard)   state.subscribedDiscounts.push(action.payload)
            state.discounts = state.discounts.filter(discount => discount.id !== action.payload.id)
        },

        getDiscounts: (state: DiscountSlice, action: GetDiscountsAction) => {
            state.discounts = action.payload
        }
    }
})

export default slice.reducer

export const {selectDiscount, addBugs, subribeToDiscountCard, getDiscounts} = slice.actions