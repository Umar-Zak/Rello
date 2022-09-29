import { createSlice } from "@reduxjs/toolkit";


type UIInterface = {
    showDiscountModal: boolean,
    isLoading: boolean,
    showTransactionsModal: boolean
}

const slice =  createSlice({
    initialState: {
        showDiscountModal: false,
        isLoading: false,
        showTransactionsModal: false
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
        },

        showTransModal: (state:  UIInterface) => {
            state.showTransactionsModal = true
            
        },

        closeTransModal: (state: UIInterface) => {
            state.showTransactionsModal = false
        }
    }
})

export default slice.reducer
export const {closeDiscountModal, openDiscountModal, startLoader, stopLoader, showTransModal, closeTransModal} = slice.actions