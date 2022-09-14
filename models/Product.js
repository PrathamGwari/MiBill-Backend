const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    storeId: {
        type: Array,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    SSN: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Store', ProductSchema)