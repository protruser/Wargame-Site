const db = require('../config/db');
const { hashPassword } = require('../utils/hash');

// ID duplicate check
const findUserById = async (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE user_id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// nickname duplicate check
const findUserByNickname = async (nickname) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE nickname = ?', [nickname], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// user creation
const createUser = async (id, nickname, plainPassword) => {
    const hashed = await hashPassword(plainPassword);

    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO users (user_id, nickname, password) VALUES (?, ?, ?)',
            [id, nickname, hashed],
            function (err) {
                if (err) reject(err);
                else resolve();
            }
        );
    });
};

// challenge initialization
const createUserChallenge = async (id) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO user_challenges (user_id) VALUES (?)', [id], function (err) {
            if (err) reject(err);
            else resolve();
        });
    });
};

module.exports = {
    findUserById,
    findUserByNickname,
    createUser,
    createUserChallenge,
};
