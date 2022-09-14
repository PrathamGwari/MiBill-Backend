const router = require('express').Router()
const Store = require('../models/Store')

router.post('/', async (req, res) => {
    try {
        const {location, name, address, operatorId} = req.body
        const newStore = Store({
            location,
            name,
            address,
            operatorId
        })
        const createdStore = await newStore.save()
        res.status(200).json({
            message: "SUCCESS",
            store: createdStore
        })
    } catch(err) {
        res.status(500).json({err})
    } 
})

router.get('/:operatorId', async (req, res) => {
    try{ 
        const operatorId = req.params.operatorId
        const stores = await Store.find({operatorId})

        res.status(200).json({
            message: "SUCCESS",
            stores
        })
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router