const router = require('express').Router()
const Operator = require('../models/Operator')

router.get('/:operatorId', async (req, res) => {
    try {
        const operatorId = req.params.operatorId
        const operator = await Operator.findOne({operatorId})

        if(operator) res.status(200).json({
            message: "SUCCESS",
            operator
        })
        else res.status(200).json({
            message: "OPERATOR NOT FOUND"
        })
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router