import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: false },
    occupation: { type: String, required: false, trim: true },
    imageFile: { type: String, required: false },
    googleId: { type: String, required: false },
    id: { type: String },
    role: {
        type: String,
        default: "membre",
    }
})

export default mongoose.model('User', userSchema)