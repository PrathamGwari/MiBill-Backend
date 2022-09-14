const router = require('express').Router()
const Product = require('../models/Product')

router.post('/', async (req, res) => {
    try {
        const {imageURL, name, storeId, category, SSN, price} = req.body
        
        const newProduct = Product({
            imageURL, 
            name, 
            storeId, 
            category, 
            SSN, 
            price
        })
        await newProduct.save()
        res.status(200).json({
            message: "SUCCESS",
            product: newProduct
        })
    } catch(err) {
        res.status(500).json({err})
    }
})

router.get('/:storeId', async (req, res) => {
    try {
        const storeId = req.params.storeId
        const products = await Product.find({storeId: {$in: [storeId]}})

        res.status(200).json({
            message: "SUCCESS",
            products
        })
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router