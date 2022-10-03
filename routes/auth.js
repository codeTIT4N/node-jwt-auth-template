const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/auth')
const registerValidationMiddleware = require('../middleware/register-validation')
const loginValidation = require('../middleware/login-validation')

router.post('/register', registerValidationMiddleware, registerUser);
router.post('/login', loginValidation, loginUser);

module.exports = router;