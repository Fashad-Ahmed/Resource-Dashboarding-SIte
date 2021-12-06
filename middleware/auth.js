const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // get token from header
    const token = req.header('x-auth-token')

    // no  token 
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorizationn denied!' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.teacher = decoded.teacher;
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token.' });
    }
}