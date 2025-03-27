const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => (
    jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1m' })
);

module.exports = generateToken;