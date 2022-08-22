import { createSlice } from "@reduxjs/toolkit";


type UIInterface = {
    showDiscountModal: boolean
}

const slice =  createSlice({
    initialState: {
        showDiscountModal: false
    },
    name: "ui",
    reducers: {
        openDiscountModal: (state: UIInterface) => {
            state.showDiscountModal = true
        },
        closeDiscountModal: (state: UIInterface) => {
            state.showDiscountModal = false
        }
    }
})

export default slice.reducer
export const {closeDiscountModal, openDiscountModal} = slice.actions