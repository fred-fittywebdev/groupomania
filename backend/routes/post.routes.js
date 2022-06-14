import express from 'express';

const router = express.Router();

import { createPost, getPosts } from '../controllers/Tour.js';

router.get('/', getPosts)
router.post('/', createPost)


export default router