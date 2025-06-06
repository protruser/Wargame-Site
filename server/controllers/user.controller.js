const db = require('../config/db');

exports.addUser = (req, res) => {
    const { user_id, nickname, password } = req.body;

    const userInsert = `
    INSERT INTO users (user_id, nickname, password, total_score)
    VALUES (?, ?, ?, 0)
  `;
    const userChallengesInsert = `INSERT INTO user_challenges (user_id) VALUES (?)`;

    db.run(userInsert, [user_id, nickname, password], (err) => {
        if (err) {
            return res.status(500).json({ error: 'User insert failed', details: err.message });
        }
        db.run(userChallengesInsert, [user_id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'user_challenges insert failed', details: err.message });
            }
            res.json({ message: 'User added successfully' });
        });
    });
};

exports.getStatistics = (req, res) => {
    const getUserStatsQuery = `
    SELECT u.user_id AS username, uc.challenge_1_time, uc.challenge_2_time, uc.challenge_3_time,
           uc.solve_success, uc.solve_fail
    FROM users u
    JOIN user_challenges uc ON u.user_id = uc.user_id
  `;

    const getChallengesQuery = `
    SELECT challenge_id, title, score FROM challenges WHERE challenge_id IN (1, 2, 3)
  `;

    db.all(getChallengesQuery, [], (err, challengeRows) => {
        if (err) return res.status(500).json({ error: 'Challenge info error', details: err.message });

        const challengeMap = {};
        for (const row of challengeRows) {
            challengeMap[row.challenge_id] = { title: row.title, score: row.score };
        }

        db.all(getUserStatsQuery, [], (err, users) => {
            if (err) return res.status(500).json({ error: 'User stats error', details: err.message });

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
                const successRate = totalAttempts ? (user.solve_success / totalAttempts) * 100 : 0;
                const failRate = totalAttempts ? (user.solve_fail / totalAttempts) * 100 : 0;

                return {
                    username: user.username,
                    points,
                    total_score: totalScore,
                    success_rate: successRate.toFixed(2),
                    fail_rate: failRate.toFixed(2),
                    latestSolvedTime,
                };
            });

            enrichedUsers.sort((a, b) => {
                if (b.total_score !== a.total_score) return b.total_score - a.total_score;
                return a.latestSolvedTime - b.latestSolvedTime;
            });

            const data = enrichedUsers.map((user, idx) => {
                const { latestSolvedTime, ...rest } = user;
                return { rank: idx + 1, ...rest };
            });

            res.json({ data });
        });
    });
};

exports.deleteAccount = (req, res) => {
    const tokenUserId = req.user.user_id;
    const paramUserId = req.params.user_id;

    if (tokenUserId !== paramUserId) {
        return res.status(403).json({ error: '🚫 You are not authorized to delete this account' });
    }

    db.serialize(() => {
        db.run(`DELETE FROM user_challenges WHERE user_id = ?`, [paramUserId], function (err) {
            if (err) return res.status(500).json({ error: '❌ Failed to delete challenge data' });

            db.run(`DELETE FROM users WHERE user_id = ?`, [paramUserId], function (err) {
                if (err) return res.status(500).json({ error: '❌ Failed to delete user' });

                return res.json({ message: '✅ Account deleted successfully' });
            });
        });
    });
};