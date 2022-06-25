import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const getUserProfile = createAsyncThunk('auth/getUserProfile', async (id, { rejectWithValue }) => {
    try {
        const response = await api.getProfile(id)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async ({ id, info }, { rejectWithValue }) => {
    try {
        const response = await api.updateProfile(id, info)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userDetail: null,
        error: "",
        loading: false
    },

    extraReducers: {
        [getUserProfile.pending]: (state, action) => {
            state.loading = true
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.loading = false
            state.userDetail = action.payload
        },
        [getUserProfile.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [updateUserProfile.pending]: (state, action) => {
            state.loading = true
        },
        [updateUserProfile.fulfilled]: (state, action) => {
            state.loading = false
            state.userDetail = action.payload
        },
        [updateUserProfile.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})

export default profileSlice.reducer