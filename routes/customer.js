const router = require('express').Router()
const Customer = require('../models/Customer')

router.post('/', async (req, res) => {
    try {
        const {name, email, address, phoneNumer} = req.body
        if(!name || !email || !address || !phoneNumer) return res.status(400).json({err: "Some user details missing!"})
        
        const newCustomer = Customer({
            name,
            email,
            address,
            phoneNumer
        })
        const customer = await newCustomer.save()
        res.status(200).json({
            message: "SUCCESS",
            customer
        })
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router