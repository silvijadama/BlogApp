const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reservedBy: {
        type: String,
        default: null
    }

})

module.exports = mongoose.model("Product", productSchema)