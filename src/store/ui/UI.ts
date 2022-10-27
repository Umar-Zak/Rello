import { createSlice } from "@reduxjs/toolkit";


type UIInterface = {
    showDiscountModal: boolean,
    isLoading: boolean,
    showTransactionsModal: boolean,
    showErrorModal: boolean,
    errorMessage: string
}


const slice =  createSlice({
    initialState: {
        showDiscountModal: false,
        isLoading: false,
        showTransactionsModal: false,
        showErrorModal: false,
        errorMessage: ""
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
        },

        showErrorModal: (state: UIInterface, action: {type: string, payload: string}) => {
            state.showErrorModal = true
            state.errorMessage = action.payload
        },

        hideErrorModal: (state: UIInterface) => {
            state.showErrorModal = false
            state.errorMessage = ""
        }
    }
})

export default slice.reducer
export const {closeDiscountModal, openDiscountModal, startLoader, stopLoader, showTransModal, closeTransModal, showErrorModal, hideErrorModal} = slice.actions