import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8080' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// Routes sans auth
export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)

// Routes avec auth
export const createPost = (postData) => API.post('/post', postData)
export const getPosts = () => API.get('/post')
export const getPost = (id) => API.get(`/post/${id}`)
export const deletePost = (id) => API.delete(`/post/${id}`)
export const updatePost = (updatedPostData, id) => API.patch(`/post/${id}`, updatedPostData)
export const getPostsByUser = (userId) => API.get(`/post/userPosts/${userId}`) // id -> celle de l'utilisateur

// Search
export const getPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery}`)