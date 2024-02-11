import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalItems: 0
}

export const totalItemsCartSlice = createSlice({
    name: 'totalItems',
    initialState,
    reducers: {
        setTotalItems: (state, action) => {
            const totalItemCart = action.payload;
            state.totalItems = totalItemCart
        },
        deleteTotalItems: (state, action) => {
            const totalItemCart = action.payload;
            state.totalItems = totalItemCart
        }
    }
});

export const { setTotalItems, deleteTotalItems } = totalItemsCartSlice.actions;
export default totalItemsCartSlice.reducer;