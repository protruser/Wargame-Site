require('dotenv').config();
const bcrypt = require('bcrypt');

const SALT_ROUNDS = process.env.SALT_ROUNDS;

// hash
function hashPassword(password) {
    return bcrypt.hash(password, parseInt(SALT_ROUNDS));
}

// compare
function comparePassword(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword,
};
