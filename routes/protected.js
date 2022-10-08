const router = require('express').Router();
const verify = require('../middleware/verify-token')
const sampleController = require('../controllers/protected')

// sample route - just put the verify middleware before any route here for JWT validation.
router.get('/', verify, sampleController)

module.exports = router