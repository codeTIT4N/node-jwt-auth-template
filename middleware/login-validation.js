const Joi = require('@hapi/joi')

// Joi Validations
const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});


const loginValidation = (req, res, next) => {
    // validating using joi
    const { error } = schema.validate(req.body);
    if (!error)
        next();
    else
        res.status(400).send(error.details[0].message)
}

module.exports = loginValidation;