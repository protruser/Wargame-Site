const challengeService = require('../services/challenge.service');

exports.submitAnswer = async (req, res) => {
    const { challenge_id, submitted_flag } = req.body;
    const user_id = req.user.user_id;
    const currentTime = Date.now();

    try {
        // 1. Verify that you are a user who has already solved the problem
        const timeColumn = `challenge_${challenge_id}_time`;

        const user = await new Promise((resolve, reject) => {
            db.get(
                `SELECT ${timeColumn} FROM user_challenges WHERE user_id = ?`,
                [user_id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (user && user[timeColumn] !== 0) {
            return res.status(400).json({ message: "You've already got the answer. You can't resubmit it." });
        }

        // 2. Importing Problem Information
        const challenge = await challengeService.getChallenge(challenge_id);
        if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

        // 3. Check if there's a correct answer
        if (submitted_flag === challenge.flag) {
            await challengeService.updateSuccess(user_id, challenge_id, challenge.score, currentTime);
            res.json({ message: '✅ Correct!' });
        } else {
            await challengeService.updateFail(user_id);
            res.json({ message: '❌ Fail' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};
