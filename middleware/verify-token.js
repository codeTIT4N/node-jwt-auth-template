const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth)
        res.status(401).send('Access denied!!!')
    let token = auth.split(' ')[1];
    if (!token)
        res.status(401).send('Access denied!!!')
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next()
    } catch (err) {
        res.status(400).send('Invalid token!!!')
    }
}
module.exports = verify