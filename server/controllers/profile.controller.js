const profileService = require('../services/profile.service');
const { comparePassword, hashPassword } = require('../utils/hash');
const db = require('../config/db');

exports.loadProfile = async (req, res) => {
    const id = req.user.user_id;

    try {
        const user = await profileService.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            id: user.user_id,
            nickname: user.nickname,
        });
    } catch (err) {
        console.error('❌ Failed to load profile:', err);
        res.status(500).json({ error: 'Failed to load profile' });
    }
};

exports.updatePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    const id = req.user.user_id;
    console.log(id);

    try {
        const user = await profileService.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Current password is incorrect' });

        const hashed = await hashPassword(newPassword);
        await profileService.updatePassword(id, hashed);

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Password update failed' });
    }
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
