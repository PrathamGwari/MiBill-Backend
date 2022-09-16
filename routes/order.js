const router = require('express').Router()
const Order = require('../models/Order')

router.get('/:id', async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({_id: orderId})

        if(order) res.status(200).json({
            message: "SUCCESS",
            order
        })
        else res.status(400).json({
            message: "ORDER NOT FOUND!"
        })
        
    } catch(err) {
        res.status(500).json({err})
    }
})

router.get('/:storeId', async (req, res) => {
    try {
        const storeId = req.params.storeId
        const orders = await Order.find({storeId})

        if(orders) res.status(200).json({
            message: "SUCCESS",
            orders
        })
        else res.status(400).json({
            message: "NO ORDER FOUND!"
        })

    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            operatorId,
            storeId,
            invoiceId,
            products,
            cost,
            customerName,
            customerEmail,
            customerAddress,
            customerPhoneNumber
        } = req.body

        const newOrder = Order({
            operatorId,
            storeId,
            invoiceId,
            products,
            cost,
            customerName,
            customerEmail,
            customerAddress,
            customerPhoneNumber
        })

        await newOrder.save()

        res.status(200).json({
            message: "SUCCESS",
            order: newOrder
        })
        
    } catch(err) {
        res.status(500).json({
            err
        })
    }
})

module.exports = router