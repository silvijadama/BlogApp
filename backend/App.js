
const express = require("express")
const app = express()
const cors = require("cors")
const mainRouter = require("./routers/mainRouter")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const {login} = require("./controllers/mainController");
const {promptAi} = require("./controllers/mainControllerAI")
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",         // allow all origins
        methods: ["GET", "POST"]
    }
})

const connectedUsersList = []

function isUserConnected(newlyLoggedUser){
    for (const user of connectedUsersList) {
        // console.log(`Is same user user: "${user.id}", newly logged user: "${newlyLoggedUser.id}"`, user, newlyLoggedUser)
        if (user.username === newlyLoggedUser) {
            return true
        }
        console.log(`Logged in user: "${user.username}", newly logged user: "${newlyLoggedUser}"`)
    }

    return false
}

io.on("connection", (socket) => {
    console.log('SOCKET CONNECTED')
    console.log(socket.id)

    socket.on("userConnected", (username) => {
        console.log(`New user connected: "${username}"`)

        const currentUser = {
            username,
            socket_id: socket.id
        }

        const isUserAlreadyConnect = isUserConnected(username)
        console.log(`Is user already connected: ${isUserAlreadyConnect}`)
        if (!isUserAlreadyConnect) {
            connectedUsersList.push(currentUser)
        }

        socket.emit("onlineUsersUpdated", connectedUsersList)

        // poke notification

        socket.on("pokeUser", (pokedUsername) => {
            console.log(`${username} poked ${pokedUsername}`)

            const userWhoPokedSomeone = {
                username,
                socket_id: socket.id
            }

            const pokedUser = connectedUsersList.find(user => user.username === pokedUsername)

            if (pokedUser) {
                // notify the poked user only
                io.to(pokedUser.socket_id).emit("userWhoPokedYou", userWhoPokedSomeone)
            }
        })
    })
        socket.on("chatMessageToServer", ({username, message}) =>{
            console.log("Message: ", username, message)

            io.emit("chatMessageToBrowser", {username, message, time: new Date()})
        })

        socket.on("disconnect", () =>{
            console.log("User disconnected:", socket.id)
        })
});

dotenv.config()

mongoose.connect(process.env.MONGO_KEY)
    .then(() => console.log("database connected!"))
    .catch(err => {
        console.log(err)
    })
app.use(cors())
app.use(express.json())
app.use("/api", mainRouter)

console.log("backend is working")
httpServer.listen(2500)

