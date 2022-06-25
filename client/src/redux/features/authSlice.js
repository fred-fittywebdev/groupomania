import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

//Actions
// login
export const login = createAsyncThunk('auth/login', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signin(formValue)
        toast.success("Connexion résussie")
        navigate('/')

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//registerexport const login = createAsyncThunk('auth/login', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
export const register = createAsyncThunk('auth/register', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signup(formValue)
        toast.success("inscription résussie")
        navigate('/')

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


//login
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: '',
        loading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.user.result = action.payload
            let localStorageResult = JSON.parse(localStorage.getItem('profile'))
            localStorageResult.result = action.payload
            localStorage.setItem('profile', JSON.stringify(localStorageResult))
        },
        setLogout: (state, action) => {
            localStorage.clear()
            state.user = null
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
    }
})

export const { setUser, setLogout, setProfile } = authSlice.actions

export default authSlice.reducer