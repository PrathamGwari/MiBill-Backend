const dotenv = require('dotenv')
dotenv.config()

const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.REGION
})

const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
        bucket: process.env.BUCKET,
        s3: s3,
        key: (req, file, cb) => {
            cb(null, Date.now()+file.originalname)
        }
    })
})

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) {
                return res.status(403).json("token not valid!")
            }
            req.user = user;
            next();
        })

    } else {
        res.status(401).json("not authenticated")
    }
}

module.exports = {s3, upload, verify}