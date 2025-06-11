const { findUserById } = require('../services/auth.service');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
    const { id, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        if (!id || !password) {
            return res.status(400).json({ message: 'Please enter both your ID and password.' });
        }

        if (!emailRegex.test(id)) {
            return res.status(400).json({ message: 'Email format is invalid.' });
        }

        const user = await findUserById(id);
        if (!user) {
            return res.status(401).json({ message: 'It is a non-existent user.' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password is not valid.' });
        }

        const token = generateToken({
            user_id: user.user_id,
            nickname: user.nickname,
            email: user.email,
        });

        return res.status(200).json({
            message: 'login success',
            token,
            user: {
                id: user.user_id,
                nickname: user.nickname,
                total_score: user.total_score,
                challenge_1_time: user.challenge_1_time,
                challenge_2_time: user.challenge_2_time,
                challenge_3_time: user.challenge_3_time,
                solve_success: user.solve_success,
                solve_fail: user.solve_fail,
            },
        });
    } catch (err) {
        console.error('❌ Login Error:', err);
        return res.status(500).json({ message: 'Login failed due to a server error.' });
    }
};

module.exports = {
    login,
};
