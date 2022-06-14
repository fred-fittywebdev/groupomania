import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, trim: true },
    content: { type: String, required: true },
    name: { type: String, trim: true },
    creator: { type: String, trim: true, required: true },
    imageFile: { type: String },
    tags: [String],
    createdAt: { type: Date, default: new Date() },
    likeCount: { type: Number, default: 0 },
})

export default mongoose.model('Post', postSchema);
