require('dotenv').config()

const router = require('express').Router()
const {upload, s3} = require('../middleware/middleware')


router.post('/upload', upload.single('file'), async(req, res) => {
    console.log(req.file)
    res.status(200).json({message: "SUCCESS", url: req.file.location, key: req.file.key})
})

router.get('/list', async (req, res) => {
    try {
        const objects = await s3.listObjectsV2({Bucket: process.env.BUCKET}).promise()
        const data = objects.Contents.map(object => object.Key)
        res.status(200).json({message: "SUCCESS", data});
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get('/download/:filename', async (req, res) => {
    try {
        let objData = await s3.getObject({Bucket: process.env.BUCKET, Key: req.params.filename}).promise()
        res.send(objData.Body)
    } catch( err ) {
        res.status(500).json({message:"ERROR", error: err})
    }
})

router.get('/delete/:filename', async(req, res) => {
    await s3.deleteObject({Bucket: process.env.BUCKET, Key: req.params.filename}).promise()
    res.status(200).json({message: `${req.params.filename} Deleted Successfully`})
})
module.exports = router