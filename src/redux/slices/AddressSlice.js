import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "addresses",
    initialState: {
        data: []
    },
    reducers: {
        addAddress: (state, action) => {
            state.data.push(action.payload)
        },
        deleteAddress: (state, action) => {
            let newArray = state.data.filter(item => {
                return item.id != action.payload
            })
            state.data = newArray
        },
        updateAddress: (state, action) => {
            const upd_obj = state.data.map(obj => {
                if (obj.id == action.payload.id) {
                 obj.state=action.payload.state,
                 obj.city=action.payload.city,
                 obj.pincode=action.payload.pincode,
                 obj.type=action.payload.type
                }
                return obj;
               })

               state.data=upd_obj
        }
    }
})

export default addressSlice.reducer

export const { addAddress, deleteAddress, updateAddress } = addressSlice.actions