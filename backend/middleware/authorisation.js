const jwt = require("jsonwebtoken")
const jwtSecret = "secret_123"

module.exports = {
    jwtEncode: async (user) => {
        return  jwt.sign(user, jwtSecret)
    },

    jwtDecode:  (req, res, next) => {
        const token = req.headers.authorization
        console.log(token, "Authenticating user:")

        if (!token) {
            return res.json({success: false, message: "no auth token provided"})
        }
        console.log(token, "decoding token...")
        let decoded
        try {
            decoded =  jwt.verify(token, jwtSecret)
        } catch (err) {
            return res.json ({success: false, message: "jwt verify error", token: token})
        }
        // console.log(token, "failed to decode...")

        if (!decoded) {
            return res.json ({success: false, message: "no user in token"})
        }

        req.user = decoded
        next()
    }
}