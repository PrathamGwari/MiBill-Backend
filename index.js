require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


// routes
const authRoute = require('./routes/auth')
const storageRoute = require('./routes/storage')
const storeRoute = require('./routes/store')
const productRoute = require('./routes/product')
const paymentRoute = require('./routes/payment')
const ordersRoute = require('./routes/order')
const emailRoute = require('./routes/email')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log(err))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/storage', storageRoute)
app.use('/api/store', storeRoute)
app.use('/api/product', productRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/email', emailRoute)

app.listen(process.env.PORT || 8000, ()=>{
    console.log('backend is running on port 8000')
})