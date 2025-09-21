const mongoose = require("mongoose")
const Schema = mongoose.Schema

const  userPostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model("Post", userPostSchema)