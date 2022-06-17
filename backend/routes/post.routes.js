import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import { createPost, getPost, getPostsByUser, getPosts, deletePost, updatePost } from '../controllers/Post.js';

router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.delete('/:id', auth, deletePost)
router.patch('/:id', auth, updatePost)
router.get('/userPosts/:id', auth, getPostsByUser)



export default router