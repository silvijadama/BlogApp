const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordOne: {
        type: String,
        required: true
    },
    pokedUsersArr: [{
        type: Schema.Types.ObjectId,
        ref: "User" }]
})

module.exports = mongoose.model("User", userSchema)