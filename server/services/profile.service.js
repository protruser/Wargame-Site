const db = require('../config/db');

exports.findById = (user_id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT user_id, nickname, password FROM users WHERE user_id = ?', [user_id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.updatePassword = (user_id, hashedPassword) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, user_id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};
