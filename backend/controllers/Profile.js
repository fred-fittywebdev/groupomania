import UserModel from '../models/user.js'
import mongoose from 'mongoose'

export const getProfile = async (req, res) => {
    const { id } = req.params
    try {
        const profile = await UserModel.findById(id)
        res.status(200).json(profile)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params
    const { name, occupation, imageFile } = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `Vous n\'êtes pas inscrit sur ce site` })
        }
        const updatedProfile = {
            name,
            occupation,
            imageFile,
            _id: id
        }
        await UserModel.findByIdAndUpdate(id, updatedProfile, { new: true })
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
