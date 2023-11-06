import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "./utilsSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        sidebar: utilsSlice,
        user: userSlice
    }
});