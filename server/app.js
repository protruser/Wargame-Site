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
app.get('/api/statistics', (req, res) => {
    const getUserStatsQuery = `
        SELECT 
            u.user_id AS username,
            uc.challenge_1_time,
            uc.challenge_2_time,
            uc.challenge_3_time,
            uc.solve_success,
            uc.solve_fail
        FROM users u
        JOIN user_challenges uc ON u.user_id = uc.user_id
    `;

    const getChallengesQuery = `
        SELECT challenge_id, title, score
        FROM challenges
        WHERE challenge_id IN (1, 2, 3)
    `;

    // 1. challenge info
    db.all(getChallengesQuery, [], (err, challengeRows) => {
        if (err) {
            return res.status(500).json({ error: '❌ Challenge static info error', details: err.message });
        }

        // challenge_id: 1~3에 해당하는 정보 저장
        const challengeMap = {};
        for (const row of challengeRows) {
            challengeMap[row.challenge_id] = {
                title: row.title,
                score: row.score,
            };
        }

        // 2. user info + challenge time
        db.all(getUserStatsQuery, [], (err, users) => {
            if (err) {
                return res.status(500).json({ error: '❌ user static info error', details: err.message });
            }

            const enrichedUsers = users.map((user) => {
                const points = [];
                let totalScore = 0;
                let latestSolvedTime = 0;

                for (let i = 1; i <= 3; i++) {
                    const time = user[`challenge_${i}_time`];
                    if (time && time !== 0 && challengeMap[i]) {
                        const { title, score } = challengeMap[i];
                        points.push({
                            timestamp: new Date(time).toISOString(),
                            title,
                            score,
                        });
                        totalScore += score;
                        latestSolvedTime = Math.max(latestSolvedTime, time);
                    }
                }

                const totalAttempts = user.solve_success + user.solve_fail;
                const successRate = totalAttempts > 0 ? (user.solve_success / totalAttempts) * 100 : 0;
                const failRate = totalAttempts > 0 ? (user.solve_fail / totalAttempts) * 100 : 0;

                return {
                    username: user.username,
                    points,
                    total_score: totalScore,
                    success_rate: successRate.toFixed(2),
                    fail_rate: failRate.toFixed(2),
                    latestSolvedTime,
                };
            });

            // SORT: total_score DESC → solved first
            enrichedUsers.sort((a, b) => {
                if (b.total_score !== a.total_score) return b.total_score - a.total_score;
                return a.latestSolvedTime - b.latestSolvedTime;
            });

            // rank
            const data = enrichedUsers.map((user, index) => {
                const { latestSolvedTime, ...rest } = user;
                return {
                    rank: index + 1,
                    ...rest,
                };
            });

            res.json({ data });
        });
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
