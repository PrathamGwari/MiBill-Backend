const router = require('express').Router()

router.post('/login', (req, res) => {
    console.log('got login request')
    res.status(200).json('success')
})

router.post('/register', (req, res) => {
    console.log('got register request')
    res.status(200).json('success')
})
module.exports = router