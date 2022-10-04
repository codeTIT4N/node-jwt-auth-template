const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // store the user in db
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
}

const loginUser = async (req, res) => {
    // Create and assign a JWT
    const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    res.header('auth-token', token).send(token);
}

module.exports = {
    registerUser,
    loginUser
}