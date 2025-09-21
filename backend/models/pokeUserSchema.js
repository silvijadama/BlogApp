const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pokeUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        requires: true,
    },
})

module.exports = mongoose.model("pokeUser", pokeUserSchema)