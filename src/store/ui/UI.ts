import { createSlice } from "@reduxjs/toolkit";


type UIInterface = {
    showDiscountModal: boolean,
    isLoading: boolean
}

const slice =  createSlice({
    initialState: {
        showDiscountModal: false,
        isLoading: false
    },
    name: "ui",
    reducers: {
        openDiscountModal: (state: UIInterface) => {
            state.showDiscountModal = true
        },
        closeDiscountModal: (state: UIInterface) => {
            state.showDiscountModal = false
        },

        startLoader: (state: UIInterface) => {
            state.isLoading = true
        },

        stopLoader: (state: UIInterface) => {
            state.isLoading = false
        }
    }
})

export default slice.reducer
export const {closeDiscountModal, openDiscountModal, startLoader, stopLoader} = slice.actions