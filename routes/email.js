require('dotenv').config

const router = require('express').Router()
const {upload} = require('../middleware/middleware')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD
    }
})

router.post('/sendemail', upload.single('file'), async (req, res) => {
    let mailOptions = {
        from: process.env.EMAIL_ID,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        attachments: [
            {
                path: req.file.location
            }
        ]
    }

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) res.status(200).json({err})
        else res.status(200).json({
            message: "SUCCESS",
            info: info
        })
    })
})

module.exports = router