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
    const { page } = req.query
    try {
        // const posts = await PostModel.find().sort({ createdAt: -1 },)
        // res.status(200).json(posts)

        const limit = 3
        const startIndex = (Number(page) - 1) * limit
        const total = await PostModel.countDocuments({}) // On récupère le nombre total de post en bdd
        const posts = await PostModel.find().limit(limit).skip(startIndex).sort({ createdAt: -1 })
        const totalPostsData = await PostModel.find()
        res.json({
            data: posts,
            currentPage: Number(page),
            totalPostsData,
            numberOfPages: Math.ceil(total / limit)
        })
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

// Modifier un post
export const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, content, creator, imageFile, tags, category } = req.body

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
            category,
            _id: id
        }

        await PostModel.findByIdAndUpdate(id, updatedPost, { new: true })
        res.json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: 'Une erreur est survenue.' })
    }
}

// Chercher un post
export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query

    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await PostModel.find({ title })
        res.json(posts)
    } catch (error) {
        res.status(404).json({ message: 'une erreur est survenue, la recherche n\'a pas donné de résultat' })
    }
}

// Trouver des post en fonction de leur tags
export const getPostsByTag = async (req, res) => {
    const { tag } = req.params

    try {
        const posts = await PostModel.find({ tags: { $in: tag } })
        res.json(posts)
    } catch (error) {
        res.status(404).json({ message: 'une erreur est survenue' })
    }
}

// Posts du même genre
export const getRelatedPosts = async (req, res) => {
    const tags = req.body

    try {
        const posts = await PostModel.find({ tags: { $in: tags } }).sort({ createdAt: -1 },)
        res.json(posts)
    } catch (error) {
        res.status(404).json({ message: 'une erreur est survenue, la recherche n\'a pas donné de résultat' })
    }
}

// Mise en place des likes sur le posts
export const likePost = async (req, res) => {
    try {
        const { id } = req.params

        if (!req.userId) {
            return res.json({ message: "Vous devez être authentifié" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Ce post n\'existe pas' })
        }

        const post = await PostModel.findById(id)
        // On stocke l'id du user dans les likes
        const index = post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Récuperer tous les tags
export const getAllTags = async (req, res) => {
    try {
        const posts = await PostModel.find()
        const totalTags = [... new Set(posts.flatMap(({ tags }) => tags))]
        res.json(totalTags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}