import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            let isThere = false;
            state.data.map((item) => {

                if (item.id === action.payload.id) {
                    isThere = true;
                    item.quantity += 1;
                }
            })
            if (!isThere) {
                state.data.push(action.payload)
            }
        },
        deleteItemFromCard: (state, action) => {
            state.data.map((item) => {
                if (item.id === action.payload.id) {
                    if (item.quantity >= 1) {
                        item.quantity -= 1
                    } if (item.quantity == 0) {
                        state.data.pop(action.payload)

                    }
                }
            })
        }
    }
})

export default cartSlice.reducer

export const { addItemToCart, deleteItemFromCard } = cartSlice.actions