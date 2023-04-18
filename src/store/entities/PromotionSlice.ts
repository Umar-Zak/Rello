import { AppDispatch, RootState } from './../Store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Promotion } from "../../models/DTOS";
import PromotionService from "../../services/PromotionService";
import { startLoader, stopLoader } from "../ui/UI";


type PromotionSlice = {
    promotions: Promotion[],
    selectedPromotion: Promotion | null
}


const slice = createSlice({
    initialState: {
        promotions: [],
        selectedPromotion: null
    } as PromotionSlice,
    name: "promotions",
    reducers: {
        initializePromotions: (state, action: PayloadAction<Promotion[]>) => {
            state.promotions = action.payload
            
        },

        selectPromotion: (state, action: {type: string, payload: Promotion}) => {
            state.selectedPromotion = action.payload
        }
    }
})


export default slice.reducer

export const loadPromotions = () => async(dispatch: AppDispatch, getState: () => RootState) => {
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

