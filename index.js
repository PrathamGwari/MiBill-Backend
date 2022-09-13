const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


// routes
const authRoute = require('./routes/auth')
const storageRoute = require('./routes/storage')

dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log(err))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/storage', storageRoute)

app.listen(process.env.PORT, ()=>{
    console.log('backend is running on port 8000')
})