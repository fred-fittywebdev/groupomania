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

// Récupérer un post spécifique a un utilsateur pour le dashboard
export const getPostsByUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Cet utilisateur n\'existe pas' })
    }
    const userPosts = await PostModel.find({ creator: id })
    res.status(200).json(userPosts)
}

// Supprimer un post
export const deletePost = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `l' ${id} ne correspond a aucun post enregistré.` })
        }

        await PostModel.findByIdAndRemove(id)
        res.json({ message: 'Le posta à bien été supprimé' })
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue.' })
    }
}

// MODIFIER un post
export const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, content, creator, imageFile, tags } = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `l' ${id} ne correspond a aucun post enregistré.` })
        }

        const updatedPost = {
            creator,
            title,
            content,
            tags,
            imageFile,
            _id: id
        }

        await PostModel.findByIdAndUpdate(id, updatedPost, { new: true })
        res.json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue.' })
    }
}