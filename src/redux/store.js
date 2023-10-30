import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "./utilsSlice";

export const store = configureStore({
    reducer: {
        sidebar: utilsSlice
    }
});