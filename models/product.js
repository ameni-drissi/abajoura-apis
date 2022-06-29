const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    prix: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
    },

    
    image: {
        type: String,
        required: true
    },

})

const Product = mongoose.model("product", productSchema)

module.exports = Product