import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Socket.io notifications
import { Server } from 'socket.io'

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

//Server Socket
const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
        ,
    }
})

let onlineUsers = []

// On fait attention a ne pas avoir toujours le même user
const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId })
}


const removeUser = (socketId) => {
    return onlineUsers.filter((user) => user.socketId !== socketId)
}

const getUser = (username) => {
    console.log("onlineUser", onlineUsers)
    return onlineUsers.find((user) => user.username === username)
}

io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
        console.log("username", username)
        addNewUser(username, socket.id)
    })

    socket.on("sendNotification", ({ senderName, receiverName }) => {
        const receiver = getUser(receiverName)
        io.to(receiver.socketId).emit("getNotification", {
            senderName
        })
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
})

// Routes
app.use('/users', userRouter)
app.use('/post', postRouter)
app.use('/profile', profileRouter)

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
    console.log(`Server is listening at ${PORT} and database connection established`))

io.listen(server)

mongoose.connect(process.env.MONGODB_URL).then(() => server).catch((error) => console.log(`${error} connexion failed`))