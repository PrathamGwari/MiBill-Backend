const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    }
}, {timestapms: true})

module.exports = mongoose.model('Store', StoreSchema)