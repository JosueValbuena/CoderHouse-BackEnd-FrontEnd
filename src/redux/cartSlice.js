import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    cartID: null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //cart items
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        deleteCart: (state, action) => {
            state.cart = action.payload;
        },
        //cart ID
        setCartID: (state, action) => {
            state.cartID = action.payload;
        }
    }
});

export const { setCart, deleteCart, setCartID } = cartSlice.actions;
export default cartSlice.reducer;