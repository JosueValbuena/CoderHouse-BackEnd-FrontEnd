import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            state.cart = cart;
        },
        deleteCart: (state, action) => {
            const cart = action.payload;
            state.cart = cart
        }
    }
});

export const { setCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;