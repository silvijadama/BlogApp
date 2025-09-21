const mongoose = require("mongoose")
const Schema = mongoose.Schema

const  aiPostSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    comments: [
        {
            username: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
            text: { type: String, required: true },
            user_id:{type: String, required: true}
        }
    ],
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model("AiPost", aiPostSchema)