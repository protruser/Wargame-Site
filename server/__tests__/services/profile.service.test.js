const { findById } = require('../../services/profile.service');
const db = require('../../config/db');

jest.mock('../../config/db');

describe('profile.service - findById (minimal test)', () => {
    test('should resolve with user object when user exists', async () => {
        const mockRow = {
            user_id: 'user@example.com',
            nickname: 'tester',
            password: 'hashed_pw',
        };

        db.get.mockImplementation((query, params, callback) => {
            callback(null, mockRow);
        });

        const result = await findById('user@example.com');

        expect(result).toEqual(mockRow);
        expect(db.get).toHaveBeenCalledWith(
            'SELECT user_id, nickname, password FROM users WHERE user_id = ?',
            ['user@example.com'],
            expect.any(Function)
        );
    });
});
