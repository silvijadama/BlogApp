const express = require("express")
const Router = express.Router()

const {addUser, login, upload, allProducts, myProducts, tokenData, reserveProduct, cancelRes} = require("../controllers/mainController")
const{promptAi, chat} = require("../controllers/mainControllerAI")
const{validateRegister, validateUploadItem, validateLogin} = require("../middleware/authValidator")
const {jwtDecode} = require("../middleware/authorisation")
;

Router.get("/prompt", promptAi)
Router.get("/chat", chat)
Router.get("/adduser", addUser)
Router.get("/login", login)
Router.get("/upload", upload)
Router.get("/allproducts", allProducts)
Router.get("/myproducts", jwtDecode, myProducts)
Router.get("/user/me", jwtDecode, tokenData)

Router.post("/chat", chat)
Router.post("/user/me", jwtDecode, tokenData)
Router.post("/adduser", validateRegister, addUser)
Router.post("/login", validateLogin, login)
Router.post("/upload", jwtDecode, validateUploadItem, upload)
Router.post("/reserve", jwtDecode, reserveProduct)
Router.post("/cancel", jwtDecode, cancelRes)


module.exports = Router