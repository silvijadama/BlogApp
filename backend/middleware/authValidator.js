const validator = require("email-validator")

module.exports = {
    validateRegister: (req, res, next) => {
        const {email, passwordOne, passwordTwo} = req.body

        if (!validator.validate(email)){
            return res.send({success: false, message: "bad email"})
        }
        if(passwordOne !== passwordTwo){
            return res.send({success: false, message: "passwords don't match"})
        }
        if(passwordOne.length >= 20 ){
            return res.send({success: false, message: "password too long!"})
        }
        if(passwordOne.length < 5){
            return res.send({success: false, message: "password too short"})
        }
        next()
    },

    validateLogin: (req, res, next) => {
        const {email, password} = req.body

        if(!email || !password){
            return res.send({success: false, message:"bad credentials"})
        }
        if(!validator.validate(email)){
            return res.send({success: false, message: "bad email"})
        }
        next()
    },

    validateUploadItem: (req, res, next) => {
        const{title, image, price} = req.body

        if(!title || !price || !image) {
            return res.send({success: false, message:" missing post data"})
        }
        next()
    },
}