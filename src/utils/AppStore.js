import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import UserReducer from "./UserSlice";

const appStore = configureStore({
    reducer:{
        cart: cartReducer,
        user: UserReducer
    }
})

export default appStore;