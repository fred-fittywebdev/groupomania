import PostModel from '../models/posts.js';


// Création d'un post
export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostModel({
        ...post,
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
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue.' })
    }
}