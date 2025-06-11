const { updatePassword } = require('../../controllers/profile.controller');
const profileService = require('../../services/profile.service');
const hashUtil = require('../../utils/hash');

jest.mock('../../services/profile.service');
jest.mock('../../utils/hash');

describe('Profile Controller - updatePassword (minimal test)', () => {
    test('should update password successfully when current password is valid', async () => {
        const req = {
            body: {
                password: 'OldPass123!',
                newPassword: 'NewPass123!',
            },
            user: {
                user_id: 'user@example.com',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileService.findById.mockResolvedValue({
            user_id: 'user@example.com',
            password: 'hashedOldPassword',
        });

        hashUtil.comparePassword.mockResolvedValue(true);
        hashUtil.hashPassword.mockResolvedValue('hashedNewPassword');
        profileService.updatePassword.mockResolvedValue();

        await updatePassword(req, res);

        expect(profileService.updatePassword).toHaveBeenCalledWith('user@example.com', 'hashedNewPassword');
        expect(res.json).toHaveBeenCalledWith({ message: 'Password updated successfully' });
    });
});
