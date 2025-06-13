const { findUserById, findUserByNickname, createUser, createUserChallenge } = require('../services/auth.service');

const register = async (req, res) => {
    const { id, nickname, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@seoultech\.ac\.kr$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-_,./])[A-Za-z\d!@#$%^&*-_./]{8,}$/;

    try {
        if (!id || !nickname || !password) {
            return res.status(400).json({ message: 'Please enter all items.' });
        }

        if (!emailRegex.test(id)) {
            return res.status(400).json({ message: 'It is not a valid email format.' });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    'Password must be at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters.',
            });
        }

        const existingId = await findUserById(id);
        if (existingId) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const existingNick = await findUserByNickname(nickname);
        if (existingNick) {
            return res.status(409).json({ message: 'Nickname already exists' });
        }

        await createUser(id, nickname, password);
        await createUserChallenge(id);

        return res.status(201).json({ message: 'Register Success!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Register Fail' });
    }
};

module.exports = {
    register,
};
