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

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async (page, { rejectWithValue }) => {
        try {
            const response = await api.getPosts(page)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const getPost = createAsyncThunk(
    'post/getPost',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getPost(id)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const likePost = createAsyncThunk(
    'post/likePost',
    async ({ _id }, { rejectWithValue }) => {
        try {
            const response = await api.likePost(_id)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const getPostsByUser = createAsyncThunk(
    'post/getPostsByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.getPostsByUser(userId)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deletePost(id)
            toast.success('post supprimé avec success.')
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ id, updatedPostData, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.updatePost(updatedPostData, id)
            toast.success('post modifié avec success.')
            navigate('/')
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const searchPosts = createAsyncThunk(
    'post/searchPosts',
    async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await api.getPostsBySearch(searchQuery)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const getPostsByTag = createAsyncThunk(
    'post/getPostsByTag',
    async (tag, { rejectWithValue }) => {
        try {
            const response = await api.getTagPosts(tag)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const getRelatedPosts = createAsyncThunk(
    'post/getRelatedPosts',
    async (tags, { rejectWithValue }) => {
        try {
            const response = await api.getRelatedPosts(tags)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const getAllTags = createAsyncThunk(
    'post/getAllTags',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getAllTags()

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const loadMorePosts = createAsyncThunk(
    'post/loadMorePosts',
    async (skip, { rejectWithValue }) => {
        try {
            const response = await api.loadMorePosts(skip)

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
        tagPosts: [],
        relatedPosts: [],
        currentPage: 1,
        numberOfPages: null,
        totalTags: [],
        error: '',
        loading: false,
        totalPostsData: [],
        loadedPosts: [],
        totalPosts: null
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
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
        [getPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.data
            state.numberOfPages = action.payload.numberOfPages
            state.currentPage = action.payload.currentPage
            state.totalPostsData = action.payload.totalPostsData
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getPostsByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getPostsByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userPosts = action.payload
        },
        [getPostsByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id } } = action.meta
            if (id) {
                state.userPosts = state.userPosts.filter((item) => item._id !== id)
                state.posts = state.posts.filter((item) => item._id !== id)
            }
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id }, } = action.meta
            if (id) {
                state.userPosts = state.userPosts.map((item) => item._id === id ? action.payload : item)
                state.posts = state.posts.map((item) => item._id === id ? action.payload : item)
            }
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [searchPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [searchPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload
        },
        [searchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getPostsByTag.pending]: (state, action) => {
            state.loading = true;
        },
        [getPostsByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagPosts = action.payload
        },
        [getPostsByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getRelatedPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getRelatedPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedPosts = action.payload
        },
        [getRelatedPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [likePost.pending]: (state, action) => { },
        [likePost.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { _id }, } = action.meta
            if (_id) {
                state.posts = state.posts.map((item) => item._id === _id ? action.payload : item)
            }
        },
        [likePost.rejected]: (state, action) => {
            state.error = action.payload.message
        },
        [getAllTags.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllTags.fulfilled]: (state, action) => {
            state.loading = false;
            state.totalTags = action.payload
        },
        [getAllTags.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [loadMorePosts.pending]: (state, action) => {
            state.loading = true;
        },
        [loadMorePosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.loadedPosts = [...state.loadedPosts, ...action.payload.posts]
            state.totalPosts = action.payload.totalPosts
        },
        [loadMorePosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
    }
})

export const { setCurrentPage } = postSlice.actions
export default postSlice.reducer