// sample controller - it will be executed after the JWT validation.
const sampleController = async (req, res) => {
    res.status(200).json({ data: 'This is only accessible using JWT', user: req.user })
}

module.exports = sampleController;