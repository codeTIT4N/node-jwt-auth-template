const router = require('express').Router();
const verify = require('../middleware/verify-token')

router.get('/', verify, (req, res) => {
    res.status(200).json({ data: 'This is only accessible using JWT', user: req.user })
})

module.exports = router