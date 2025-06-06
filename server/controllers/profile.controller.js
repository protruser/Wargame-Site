const profileService = require('../services/profile.service');
const { comparePassword, hashPassword } = require('../utils/hash');

exports.getProfile = async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const profile = await profileService.findById(user_id);
        res.json({ id: profile.user_id, nickname: profile.nickname });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

exports.updatePassword = async (req, res) => {
    const user_id = req.user.user_id;
    const { password, newPassword } = req.body;

    try {
        const user = await profileService.findById(user_id);
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Current password is incorrect' });

        const hashed = await hashPassword(newPassword);
        await profileService.updatePassword(user_id, hashed);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Password update failed' });
    }
};
