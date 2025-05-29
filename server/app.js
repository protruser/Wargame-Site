const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');  // db.js

app.use(express.json());

// 1️⃣ server test
app.get('/', (req, res) => {
    res.send('✅ Server is running and DB connected!');
});

// 2️⃣ enroll user (users + user_challenges)
app.post('/add-user', (req, res) => {
    const { user_id, nickname, password, description } = req.body;

    const userInsert = `
        INSERT INTO users (user_id, nickname, password, description, total_score)
        VALUES (?, ?, ?, ?, 0)
    `;

    const userChallengesInsert = `
        INSERT INTO user_challenges (user_id)
        VALUES (?)
    `;
    //execute userInsert query
    db.run(userInsert, [user_id, nickname, password, description], (err) => {
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

            // 1️⃣ Record: update the solved time + success count + total_score
            db.run(`
                UPDATE user_challenges
                SET ${timeColumn} = ?, solve_success = solve_success + 1
                WHERE user_id = ?
            `, [currentTime, user_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: '❌ Time update failed', details: err.message });
                }

                // 2️⃣ total_score update
                db.run(`
                    UPDATE users
                    SET total_score = total_score + ?
                    WHERE user_id = ?
                `, [challenge.score, user_id], (err) => {
                    if (err) {
                        res.status(500).json({ error: '❌ Total score update failed', details: err.message });
                    } else {
                        res.json({ message: `✅ Correct! Challenge ${challenge_id} time and score updated` });
                    }
                });
            });

        } else {
            // wrong: wrong count increment
            db.run(`
                UPDATE user_challenges
                SET solve_fail = solve_fail + 1
                WHERE user_id = ?
            `, [user_id], (err) => {
                if (err) {
                    res.status(500).json({ error: '❌ Fail count update failed', details: err.message });
                } else {
                    res.json({ message: '❌ Incorrect answer, fail count increased' });
                }
            });
        }
    });
});



// 4️⃣ get total_score (live)
app.get('/get-total-score/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const query = `
        SELECT total_score
        FROM users
        WHERE user_id = ?
    `;

    db.get(query, [user_id], (err, row) => {
        if (err) {
            res.status(500).json({ error: '❌ Total score retrieval failed', details: err.message });
        } else {
            const totalScore = row ? row.total_score : 0;
            res.json({ user_id, total_score: totalScore });
        }
    });
});


app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

// 5.성공/실패 비율 조회 api
// address for GET REQUEST from Express server
app.get('/get-solve-stats/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    db.get(`
        SELECT solve_success, solve_fail
        FROM user_challenges
        WHERE user_id = ?
    `, [user_id], (err, row) => {
        if (err) {
            res.status(500).json({ error: '❌ Solve stats retrieval failed', details: err.message });
        } else {
            const total = row.solve_success + row.solve_fail;
            const successRate = total > 0 ? (row.solve_success / total) * 100 : 0;
            const failRate = total > 0 ? (row.solve_fail / total) * 100 : 0;

            res.json({
                user_id,
                solve_success: row.solve_success,
                solve_fail: row.solve_fail,
                success_rate: successRate.toFixed(2),
                fail_rate: failRate.toFixed(2)
            });
        }
    });
});