const db = require('../config/db');

exports.getChallenge = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM challenges WHERE challenge_id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

exports.updateSuccess = (user_id, challenge_id, score, timestamp) => {
    const timeColumn = `challenge_${challenge_id}_time`;

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE user_challenges SET ${timeColumn} = ?, solve_success = solve_success + 1 WHERE user_id = ?`,
            [timestamp, user_id],
            function (err) {
                if (err) return reject(err);

                db.run(
                    `UPDATE users SET total_score = total_score + ? WHERE user_id = ?`,
                    [score, user_id],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            }
        );
    });
};

exports.updateFail = (user_id) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE user_challenges SET solve_fail = solve_fail + 1 WHERE user_id = ?`, [user_id], function (err) {
            if (err) reject(err);
            else resolve();
        });
    });
};

exports.getAllChallenges = () => {
    const db = require('../config/db');

    return new Promise((resolve, reject) => {
        db.all('SELECT challenge_id, title, description, port, score FROM challenges', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
