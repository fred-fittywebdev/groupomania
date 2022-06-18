import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import { createPost, getPost, getPostsByUser, getPosts, deletePost, updatePost, getPostsBySearch, getPostsByTag } from '../controllers/Post.js';


router.get('/search', getPostsBySearch)
router.get('/tag/:tag', getPostsByTag)
router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.patch('/:id', auth, updatePost)
router.get('/userPosts/:id', auth, getPostsByUser)



export default router