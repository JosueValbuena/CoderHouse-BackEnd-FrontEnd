import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const utilsSlice = createSlice({
    name: 'sidebar',
    initialState,
    //actions
    reducers: {
        openSideBar: (state, action) => {
            const open = action.payload;
            state.open = open;
        }
    }
})

export const { openSideBar } = utilsSlice.actions;
export default utilsSlice.reducer;