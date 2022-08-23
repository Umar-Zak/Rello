import { createSlice } from "@reduxjs/toolkit";
import { GiftCardInterface } from "../../models/DTOS";
 
type GiftSlice = {
    gifts: GiftCardInterface[],
    selectedGiftCard: GiftCardInterface | null
}

type GiftCardAction = {
    type: string
    payload: GiftCardInterface
}

const slice = createSlice({
    name: "gifts",
    initialState: {
        gifts: [],
        selectedGiftCard: null
    },
    reducers: {
      addGiftCard: (state: GiftSlice, action: GiftCardAction) => {
        state.gifts.push(action.payload)
      },

      selectGiftCard: (state: GiftSlice, action: GiftCardAction) => {
        state.selectedGiftCard = action.payload
        
      }
    }
})

export default slice.reducer
export const {addGiftCard, selectGiftCard} = slice.actions