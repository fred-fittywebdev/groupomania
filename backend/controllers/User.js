import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

// password and Email validation
import validator from "validator"

// dotenv
dotenv.config()

import UserModel from "../models/user.js"
const SECRET = process.env.SECRET

export const signin = async (req, res) => {
    const { email, password } = req.body;

    // Validation des champs du formulaire
    if (!email, !password) {
        return res.status(400).json({ message: 'Tous les champs doivent être remplis.' })
    }

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

    // Validation des champs
    if (!email, !password, !firstname, !lastname) {
        return res.status(400).json({ message: 'Tous les champs doivent être remplis.' })
    }
    // Validation de l'email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Veuillez entrer un email valide.' })
    }
    // Vérification de la sécurité du mot de isPasswordCorrect
    if (!validator.isStrongPassword(password, {
        minLength: 6, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        return res.status(400).json({ message: 'Votre mot de passe doit contenir au moins 6 caractères, dont 1 minuscule,  1 majuscule, 1 chiffre et 1 symbole' })
    }

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
