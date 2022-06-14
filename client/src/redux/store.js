import { configureStore } from "@reduxjs/toolkit";
import Authreducer from './features/authSlice'
import PostReducer from './features/postSlice'

export default configureStore({
    reducer: {
        auth: Authreducer,
        post: PostReducer
    }
})