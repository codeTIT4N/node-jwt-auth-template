const Joi = require('@hapi/joi');
const User = require('../models/User');

// Joi Validations
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});


const registerValidation = async (req, res, next) => {
    // validating using joi
    const { error } = schema.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message)
    else {
        // checking to see if the user is already registered
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist)
            res.status(400).send('Email already exists!!!')
        else
            next();
    }
}

module.exports = registerValidation;