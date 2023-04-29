import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:"wishlists",
    initialState:{
        data:[]
    },
    reducers:{
        addItemToWishlist: (state, action)=>{
            state.data.push(action.payload)
        }
    }
})

export default wishlistSlice.reducer

export const {addItemToWishlist}=wishlistSlice.actions