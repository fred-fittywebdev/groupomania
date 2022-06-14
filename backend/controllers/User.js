import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

// dotenv
dotenv.config()

import UserModel from "../models/user.js"
const SECRET = process.env.SECRET

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "Cet utilisateur n\'existe pas" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Identifiants invalides" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, existingUser: existingUser.role }, SECRET, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

export const signup = async (req, res, next) => {
    const { email, password, firstname, lastname, role } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Cet utilsateur existe déjà." })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await UserModel.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` })

        const token = jwt.sign({ email: result.email, id: result._id, oldUser: result.role }, SECRET, { expiresIn: "1h" });
        res.status(201).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue' })
        console.log(error);
    }
}
