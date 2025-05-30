const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); // db.js

app.use(express.json());

require('./challenge1/index');
require('./challenge2/index');
require('./challenge3/index');

// 1️. server test
app.get('/', (req, res) => {
    res.send('✅ Server is running and DB connected!');
});

// 2️. enroll user (users + user_challenges)
app.post('/add-user', (req, res) => {
    const { user_id, nickname, password } = req.body;

    const userInsert = `
        INSERT INTO users (user_id, nickname, password, total_score)
        VALUES (?, ?, ?, 0)
    `;

    const userChallengesInsert = `
        INSERT INTO user_challenges (user_id)
        VALUES (?)
    `;
    //execute userInsert query
    db.run(userInsert, [user_id, nickname, password], (err) => {
        if (err) {
            res.status(500).json({ error: '❌ User insert failed', details: err.message });
        } else {
            db.run(userChallengesInsert, [user_id], (err) => {
                if (err) {
                    res.status(500).json({ error: '❌ User_challenges insert failed', details: err.message });
                } else {
                    res.json({ message: '✅ User added successfully' });
                }
            });
        }
    });
});

// 3️⃣ score update
/*
POST /submit-answer
Content-Type: application/json
req.body=
{
    "user_id": "user123",
    "challenge_id": 1,
    "submitted_flag": "flag{correct_answer}"
}
*/
app.post('/submit-answer', (req, res) => {
    const { user_id, challenge_id, submitted_flag } = req.body;

    db.get(`SELECT flag, score FROM challenges WHERE challenge_id = ?`, [challenge_id], (err, challenge) => {
        if (err || !challenge) {
            return res.status(500).json({ error: '❌ Challenge lookup failed' });
        }

        if (submitted_flag === challenge.flag) {
            const timeColumn = `challenge_${challenge_id}_time`;
            const currentTime = Date.now();

            // 1. Record: update the solved time + success count + total_score
            db.run(
                `
                UPDATE user_challenges
                SET ${timeColumn} = ?, solve_success = solve_success + 1
                WHERE user_id = ?
            `,
                [currentTime, user_id],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: '❌ Time update failed', details: err.message });
                    }

                    // 2️. total_score update
                    db.run(
                        `
                    UPDATE users
                    SET total_score = total_score + ?
                    WHERE user_id = ?
                `,
                        [challenge.score, user_id],
                        (err) => {
                            if (err) {
                                res.status(500).json({ error: '❌ Total score update failed', details: err.message });
                            } else {
                                res.json({ message: `✅ Correct! Challenge ${challenge_id} time and score updated` });
                            }
                        }
                    );
                }
            );
        } else {
            // wrong: wrong count increment
            db.run(
                `
                UPDATE user_challenges
                SET solve_fail = solve_fail + 1
                WHERE user_id = ?
            `,
                [user_id],
                (err) => {
                    if (err) {
                        res.status(500).json({ error: '❌ Fail count update failed', details: err.message });
                    } else {
                        res.json({ message: '❌ Incorrect answer, fail count increased' });
                    }
                }
            );
        }
    });
});

// user-data
app.get('/api/user-stats', (req, res) => {
    const query = `
        SELECT 
            u.user_id AS username,
            u.total_score,
            uc.challenge_1_time,
            uc.challenge_2_time,
            uc.challenge_3_time,
            uc.solve_success,
            uc.solve_fail
        FROM users u
        JOIN user_challenges uc ON u.user_id = uc.user_id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: '❌ User stats retrieval failed', details: err.message });
        }

        // SORT: total_score DESC, MAX(challenge_X_time) ASC
        rows.sort((a, b) => {
            if (b.total_score !== a.total_score) {
                return b.total_score - a.total_score;
            }
            const aMax = Math.max(a.challenge_1_time, a.challenge_2_time, a.challenge_3_time);
            const bMax = Math.max(b.challenge_1_time, b.challenge_2_time, b.challenge_3_time);
            return aMax - bMax;
        });

        const data = rows.map((row) => {
            const {
                username,
                total_score,
                challenge_1_time,
                challenge_2_time,
                challenge_3_time,
                solve_success,
                solve_fail,
            } = row;

            const points = [];

            if (challenge_1_time && challenge_1_time !== 0) {
                points.push({
                    timestamp: new Date(challenge_1_time).toISOString(),
                    score: Math.floor(total_score * 0.33),
                });
            }

            if (challenge_2_time && challenge_2_time !== 0) {
                points.push({
                    timestamp: new Date(challenge_2_time).toISOString(),
                    score: Math.floor(total_score * 0.66),
                });
            }

            if (challenge_3_time && challenge_3_time !== 0) {
                points.push({
                    timestamp: new Date(challenge_3_time).toISOString(),
                    score: total_score,
                });
            }

            const total_attempts = solve_success + solve_fail;
            const success_rate = total_attempts > 0 ? (solve_success / total_attempts) * 100 : 0;
            const fail_rate = total_attempts > 0 ? (solve_fail / total_attempts) * 100 : 0;

            return {
                username,
                points,
                total_score,
                success_rate: success_rate.toFixed(2),
                fail_rate: fail_rate.toFixed(2),
            };
        });

        res.json({ data });
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
