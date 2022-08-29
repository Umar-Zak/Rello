import { createSlice } from "@reduxjs/toolkit";
import { GiftCardInterface } from "../../models/DTOS";
import GiftService from "../../services/GiftService";
import {startLoader, stopLoader} from "../ui/UI"
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
        const giftCard = state.subscribedGiftCards.find(card => card._id === action.payload._id)
        if(!giftCard) {
          state.subscribedGiftCards.push(action.payload)
          state.gifts = state.gifts.filter(gift => gift._id !== action.payload._id)
        }

        
      },

      getGiftCards: (state: GiftSlice, action: GetGiftsAction) => {
        state.gifts = action.payload
      }
    
    }
})


export const loadGiftCards = () => async (dispatch: any, getState: any) => {
  dispatch(startLoader())
  const giftCards = await GiftService.getAllGiftCards()
  dispatch(getGiftCards(giftCards))
  dispatch(stopLoader())
}

export default slice.reducer
export const {addGiftCard, selectGiftCard, subscribeToGiftCard, getGiftCards} = slice.actions