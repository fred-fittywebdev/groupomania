import PostModel from '../models/posts.js';
import mongoose from 'mongoose';


// Création d'un post
export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostModel({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString()
    })

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue lors de la création du post.' })
    }
}

// Récupération de tous les posts
export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue.' })
    }
}

// Récupération d'un seul post grâce a son ID'
export const getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue.' })
    }
}