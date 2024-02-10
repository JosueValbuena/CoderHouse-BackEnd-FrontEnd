import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "./utilsSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import totalItemsCartSlice from "./totalItemCart";

export const store = configureStore({
    reducer: {
        sidebar: utilsSlice,
        user: userSlice,
        cart: cartSlice,
        totalItemCart: totalItemsCartSlice
    }
});