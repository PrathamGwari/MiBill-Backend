const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    
    try {
        const matchedUser = await User.findOne({email})
        if(matchedUser) {
            let validated = await bcrypt.compare(password, matchedUser.password)
            if(validated) {
                const accessToken = jwt.sign({id: matchedUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "14d"})
                res.status(200).json({
                    message: "User authenticated successfully", 
                    user: matchedUser, 
                    token: accessToken
                })
            } else {
                res.status(400).json({err: "Wrong email or Password"})
            }
        } else res.status(400).json({err: "User not registered!"})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
        const newUser = User({
            username,
            email,
            password: hashedPassword
        })
        const registeredUser = await newUser.save()
        const accessToken = jwt.sign({id: registeredUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "14d"})

        res.status(200).json({
            message: "User Registered Successfully",
            user: registeredUser,
            token: accessToken
        })
    } catch(err) {
        res.status(500).json({err})
    }
})
module.exports = router