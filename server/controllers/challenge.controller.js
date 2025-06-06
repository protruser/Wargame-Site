const db = require('../config/db');

exports.submitAnswer = (req, res) => {
    const { user_id, challenge_id, submitted_flag } = req.body;

    db.get(`SELECT flag, score FROM challenges WHERE challenge_id = ?`, [challenge_id], (err, challenge) => {
        if (err || !challenge) {
            return res.status(500).json({ error: 'Challenge lookup failed' });
        }

        if (submitted_flag === challenge.flag) {
            const timeColumn = `challenge_${challenge_id}_time`;
            const currentTime = Date.now();

            db.run(
                `UPDATE user_challenges SET ${timeColumn} = ?, solve_success = solve_success + 1 WHERE user_id = ?`,
                [currentTime, user_id],
                (err) => {
                    if (err) return res.status(500).json({ error: 'Time update failed', details: err.message });

                    db.run(
                        `UPDATE users SET total_score = total_score + ? WHERE user_id = ?`,
                        [challenge.score, user_id],
                        (err) => {
                            if (err)
                                return res.status(500).json({ error: 'Score update failed', details: err.message });
                            res.json({ message: '✅ Correct!' });
                        }
                    );
                }
            );
        } else {
            db.run(`UPDATE user_challenges SET solve_fail = solve_fail + 1 WHERE user_id = ?`, [user_id], (err) => {
                if (err) return res.status(500).json({ error: 'Fail count update failed' });
                res.json({ message: '❌ Fail' });
            });
        }
    });
};
