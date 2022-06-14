import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const createPost = createAsyncThunk(
    'post/createPost',
    async ({ updatedPostData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createPost(updatedPostData)
            toast.success("post ajouté avec success")
            navigate('/')

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })


const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        posts: [],
        userPosts: [],
        error: '',
        loading: false,
    },
    extraReducers: {
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = [action.payload]
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
    }
})

export default postSlice.reducer