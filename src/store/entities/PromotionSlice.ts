import { createSlice } from "@reduxjs/toolkit";
import { Promotion } from "../../models/DTOS";
import PromotionService from "../../services/PromotionService";
import { startLoader, stopLoader } from "../ui/UI";


type PromotionSlice = {
    promotions: Promotion[],
    selectedPromotion: Promotion | null
}

type PromotionsType = {
    type: string
    payload: Promotion[]
}

const slice = createSlice({
    initialState: {
        promotions: [],
        selectedPromotion: null
    },
    name: "promotions",
    reducers: {
        initializePromotions: (state: PromotionSlice, action: PromotionsType) => {
            state.promotions = action.payload
        },

        selectPromotion: (state: PromotionSlice, action: {type: string, payload: Promotion}) => {
            state.selectedPromotion = action.payload
        }
    }
})


export default slice.reducer

export const loadPromotions = () => async(dispatch: any, getState: any) => {
    try {
        dispatch(startLoader())
        const promotions = await PromotionService.getAllPromotions()
        
        dispatch(initializePromotions(promotions))
        dispatch(stopLoader())
    } catch (error: any) {
        
        dispatch(stopLoader())
    }
}

export const {initializePromotions, selectPromotion} = slice.actions

