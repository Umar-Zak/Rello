import { createSlice } from "@reduxjs/toolkit";
import {DiscountInterface} from "../../models/DTOS"
 
type AddDiscount = {
    type: string
    payload: DiscountInterface
}

type DiscountSlice = {
    discounts: DiscountInterface[],
    selectedDiscount: DiscountInterface | null
}


 const slice = createSlice({
    initialState: {
        discounts: [],
        selectedDiscount: null
    },
    name: "bugs",
    reducers:  {
        addBugs: (state: DiscountSlice, action: AddDiscount) => {
            state.discounts.push(action.payload)
        },

        selectDiscount: (state: DiscountSlice, action:AddDiscount ) => {
            state.selectedDiscount = action.payload
            
            
        }
    }
})

export default slice.reducer

export const {selectDiscount, addBugs} = slice.actions