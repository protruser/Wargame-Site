const challengeService = require('../services/challenge.service');

exports.submitAnswer = async (req, res) => {
    const { challenge_id, submitted_flag } = req.body;
    const user_id = req.user.user_id;
    const currentTime = Date.now();

    try {
        const challenge = await challengeService.getChallenge(challenge_id);
        if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

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
