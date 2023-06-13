import { createSlice,PayloadAction } from "@reduxjs/toolkit";


type UIInterface = {
    showDiscountModal: boolean,
    isLoading: boolean,
    showTransactionsModal: boolean,
    showErrorModal: boolean,
    errorMessage: string,
    menuOffset: number,
    graphOffset: number
    verificationModalOffset: number
}


const slice =  createSlice({
    initialState: {
        showDiscountModal: false,
        isLoading: false,
        showTransactionsModal: false,
        showErrorModal: false,
        errorMessage: "",
        menuOffset: -2000,
        graphOffset: -1800,
        verificationModalOffset: 2000
    } as UIInterface,
    name: "ui",
    reducers: {
        openDiscountModal: (state) => {
            state.showDiscountModal = true
        },
        closeDiscountModal: (state) => {
            state.showDiscountModal = false
        },

        startLoader: (state) => {
            state.isLoading = true
        },

        stopLoader: (state) => {
            state.isLoading = false
        },

        showTransModal: (state) => {
            state.showTransactionsModal = true
            
        },

        closeTransModal: (state) => {
            state.showTransactionsModal = false
        },

        showErrorModal: (state, action: PayloadAction<string>) => {
            state.showErrorModal = true
            state.errorMessage = action.payload
        },

        hideErrorModal: (state) => {
            state.showErrorModal = false
            state.errorMessage = ""
        },

        showMenu: (state) => {
            state.menuOffset = 0
        },

        closeMenu: (state) => {
            state.menuOffset = -2000
        },

        showGraph: (state) => {
            state.graphOffset = 0
        },

        closeGraph: (state) => {
            state.graphOffset = -2000
        },

        showVerificationModal: (state) => {
            state.verificationModalOffset = 20
        },

        closeVerificationModal: (state) => {
            state.verificationModalOffset = 2000
        }
    }
})

export default slice.reducer
export const {closeDiscountModal, openDiscountModal, startLoader, stopLoader, showTransModal, closeTransModal, showErrorModal, hideErrorModal, showMenu, closeMenu, showGraph, closeGraph, showVerificationModal, closeVerificationModal} = slice.actions