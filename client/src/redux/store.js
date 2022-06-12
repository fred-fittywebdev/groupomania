import { configureStore } from "@reduxjs/toolkit";
import Authreducer from './features/authSlice'

export default configureStore({
    reducer: {
        auth: Authreducer,
    }
})