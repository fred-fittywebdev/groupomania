import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import { createPost, getPosts } from '../controllers/Post.js';

router.post('/', auth, createPost)
router.get('/', getPosts)



export default router