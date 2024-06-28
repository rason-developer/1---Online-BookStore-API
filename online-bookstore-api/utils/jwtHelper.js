const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require("../config/jwt");

function generateToken(payload) {
    try {
        return jwt.sign(payload, secret, { expiresIn });
    } catch (err) {
        console.error('Error generating token:', err);
        return null;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
}

module.exports = { generateToken, verifyToken };
