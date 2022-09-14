const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Operator = require('../models/Operator')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    
    try {
        const matchedOperator = await Operator.findOne({email})
        if(matchedOperator) {
            let validated = await bcrypt.compare(password, matchedOperator.password)
            if(validated) {
                const accessToken = jwt.sign({id: matchedOperator._id}, process.env.JWT_SECRET_KEY, {expiresIn: "14d"})
                res.status(200).json({
                    message: "Operator authenticated successfully", 
                    operator: matchedOperator, 
                    token: accessToken
                })
            } else {
                res.status(400).json({err: "Wrong email or Password"})
            }
        } else res.status(400).json({err: "Operator not registered!"})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
        const newOperator = Operator({
            username,
            email,
            password: hashedPassword
        })
        const registeredOperator = await newOperator.save()
        const accessToken = jwt.sign({id: registeredOperator._id}, process.env.JWT_SECRET_KEY, {expiresIn: "14d"})

        res.status(200).json({
            message: "Operator Registered Successfully",
            operator: registeredOperator,
            token: accessToken
        })
    } catch(err) {
        res.status(500).json({err})
    }
})
module.exports = router