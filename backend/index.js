import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'


// Routes
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import profileRouter from './routes/profile.routes.js'

// dotenv
dotenv.config()

// mongodb+srv://Fred:fittywebdev@cluster0.f76fu0e.mongodb.net/?retryWrites=true&w=majority

const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Routes
app.use('/users', userRouter)
app.use('/post', postRouter)
app.use('/profile', profileRouter)

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
    console.log(`Server is listening at ${PORT} and database connection established`))


mongoose.connect(process.env.MONGODB_URL).then(() => server).catch((error) => console.log(`${error} connexion failed`))