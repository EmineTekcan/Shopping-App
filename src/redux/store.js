import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from './slices/ProductsSlice'
import WishlistReducer from './slices/WishlistSlice'
import CardReducer from './slices/CartSlice'
import AddressReducer from './slices/AddressSlice'

export default store=configureStore({
    reducer:{
        product:ProductReducer,
        wishlist:WishlistReducer,
        card:CardReducer,
        address:AddressReducer
    }
})