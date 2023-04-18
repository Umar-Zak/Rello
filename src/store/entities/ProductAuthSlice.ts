import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductAuth } from "../../models/DTOS"
import ProductAuthService from "../../services/ProductAuthService"
import { AppDispatch, RootState } from "../Store"
import { startLoader, stopLoader } from "../ui/UI"

type ProductAuthSlice = {
    brands: ProductAuth[]
    selectedBrand: ProductAuth
}

const TestBrands: ProductAuth[] = []
const slice = createSlice({
    name: "productAuth",
    initialState: {
        brands: [],
        selectedBrand: TestBrands[0]
    } as ProductAuthSlice,
    reducers: {
        initializeBrands: (state, {payload}: PayloadAction<ProductAuth[]>) => {
            state.brands = payload
        },
        selectBrand: (state, {payload}: PayloadAction<ProductAuth>) => {
            state.selectedBrand = payload
        }
    }
})


export default slice.reducer

export const loadBrands = () => async(dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(startLoader())
        const brands = await ProductAuthService.getAllBrands()
        dispatch(initializeBrands(brands))
        dispatch(stopLoader())
    } catch (error) {
        dispatch(stopLoader())
    }
}

export const {initializeBrands, selectBrand} = slice.actions