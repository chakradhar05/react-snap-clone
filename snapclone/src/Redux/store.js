import { configureStore } from "@reduxjs/toolkit";
import appReducer from './appSlice'
import topReducer from './topSlice'

export default configureStore({
    reducer:{
        app : appReducer,
        top : topReducer
    }
})