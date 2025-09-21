const express = require("express")
const Router = express.Router()

const { addUser,
        login,
        createpost,
        posts,
        getPostById,
        tokenData,
        allusers,
        addComment,
        getSingleUserPosts,
        pokeUser,
        getSingleUserProfile,
        pokeHistory,
        loggedUserProfile, edit
} = require("../controllers/mainController")

const{  validateRegister,
        validateLogin,
        } = require("../middleware/authValidator")

const {jwtDecode} = require("../middleware/authorisation")

console.log("jwtDecode is:", jwtDecode);
console.log("tokenData is:", tokenData);

Router.get("/posts", posts)
Router.get("/posts/id/:post_id", getPostById)
Router.get("/allusers", allusers)

Router.get("/posts/user/:username",getSingleUserPosts)
Router.get("/allusers/:username", getSingleUserProfile)
Router.get("/pokes", jwtDecode, pokeHistory)
Router.get("/profile/:id", jwtDecode, loggedUserProfile)

Router.get("/user/me", jwtDecode, tokenData)
Router.post("/user/me", jwtDecode, tokenData)

Router.post("/adduser", validateRegister, addUser)
Router.post("/login", validateLogin, login)
Router.post("/createpost", jwtDecode, createpost)
Router.post("/poke", jwtDecode, pokeUser)
Router.post("/posts/id/:post_id/comment", jwtDecode, addComment)

Router.put("/profile/edit", jwtDecode, edit)


module.exports = Router