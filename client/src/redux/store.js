import { configureStore } from "@reduxjs/toolkit";
import Authreducer from './features/authSlice'
import PostReducer from './features/postSlice'
import ProfileReducer from './features/profileSlice'

export default configureStore({
    reducer: {
        auth: Authreducer,
        post: PostReducer,
        profile: ProfileReducer
    }
})