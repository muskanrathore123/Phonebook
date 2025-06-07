import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reduxSlice';

export const store =configureStore({
    reducer:{
        contact:userReducer
    }
})