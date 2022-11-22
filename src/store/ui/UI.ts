import { createSlice } from "@reduxjs/toolkit";


type UIInterface = {
    showDiscountModal: boolean,
    isLoading: boolean,
    showTransactionsModal: boolean,
    showErrorModal: boolean,
    errorMessage: string,
    menuOffset: number
}


const slice =  createSlice({
    initialState: {
        showDiscountModal: false,
        isLoading: false,
        showTransactionsModal: false,
        showErrorModal: false,
        errorMessage: "",
        menuOffset: -2000
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
        },

        showMenu: (state: UIInterface) => {
            state.menuOffset = 0
        },

        closeMenu: (state: UIInterface) => {
            state.menuOffset = -2000
        }
    }
})

export default slice.reducer
export const {closeDiscountModal, openDiscountModal, startLoader, stopLoader, showTransModal, closeTransModal, showErrorModal, hideErrorModal, showMenu, closeMenu} = slice.actions