import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "products",
    initialState: {
        data: null,
        isLoading: false,
        isError: false
    },
    reducers: {
        addProducts: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { addProducts } = productSlice.actions
export default productSlice.reducer

