const profileService = require('../services/profile.service');
const { comparePassword, hashPassword } = require('../utils/hash');

exports.loadProfile = async (req, res) => {
    const { id, nickname } = req.body;
    res.json({ id, nickname });
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

