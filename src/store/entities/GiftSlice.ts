import { createSlice } from "@reduxjs/toolkit";
import { GiftCardInterface } from "../../models/DTOS";
 
type GiftSlice = {
    gifts: GiftCardInterface[],
    selectedGiftCard: GiftCardInterface | null,
    subscribedGiftCards: GiftCardInterface[]
}

type GiftCardAction = {
    type: string
    payload: GiftCardInterface
}

type GetGiftsAction = {
  type: string
  payload: GiftCardInterface[]
}

const slice = createSlice({
    name: "gifts",
    initialState: {
        gifts: [],
        selectedGiftCard: null,
        subscribedGiftCards: []
    },
    reducers: {
      addGiftCard: (state: GiftSlice, action: GiftCardAction) => {
        state.gifts.push(action.payload)
      },

      selectGiftCard: (state: GiftSlice, action: GiftCardAction) => {
        state.selectedGiftCard = action.payload
        
      },
      subscribeToGiftCard: (state: GiftSlice, action: GiftCardAction) => {
        state.subscribedGiftCards.push(action.payload)
      },

      getGiftCards: (state: GiftSlice, action: GetGiftsAction) => {
        state.gifts = action.payload
      }
    
    }
})

export default slice.reducer
export const {addGiftCard, selectGiftCard, subscribeToGiftCard, getGiftCards} = slice.actions