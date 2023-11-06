import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            state.user = user;
        },
        deleteUser: (state, action) => {
            const user = action.payload
            state.user = user;
        }
    }
})

export const {setUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;