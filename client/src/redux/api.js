import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8080' })

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)