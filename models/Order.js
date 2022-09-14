const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    operatorId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    invoiceId: {
        type: String, 
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    customerId: {
        type: String,
        required: true
    }
}, {timestapms: true})

module.exports = mongoose.model('Order', OrderSchema)