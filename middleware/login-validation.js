const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const User = require('../models/User');

// Joi Validations
const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});


const loginValidation = async (req, res, next) => {
    // validating using joi
    const { error } = schema.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message)
    else {
        // checking if the email exists
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            // checking if the password is correct
            const validPass = await bcrypt.compare(req.body.password, user.password)
            if (validPass) {
                req.userId = user._id;
                next();
            }
            else
                res.status(400).send('Invalid Email or Password!!!')
        }
        else
            res.status(400).send('Invalid Email or Password!!!')
    }

}

module.exports = loginValidation;