import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import { createPost, getPost, getPosts } from '../controllers/Post.js';

router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)



export default router