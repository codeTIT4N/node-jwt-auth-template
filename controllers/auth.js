const User = require('../models/User')

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = new User({
        name: name,
        email: email,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
}

const loginUser = async (req, res, next) => {
    res.send('Login...')
}

module.exports = {
    registerUser,
    loginUser
}