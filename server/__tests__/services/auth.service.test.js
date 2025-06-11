const { findUserById } = require('../../services/auth.service');
const db = require('../../config/db');

jest.mock('../../config/db');

describe('auth.service - findUserById (minimal test)', () => {
    test('should resolve with user object if user is found', async () => {
        const mockRow = {
            user_id: 'test@example.com',
            nickname: 'tester',
            password: 'hashed',
            total_score: 100,
            challenge_1_time: 100000000,
            challenge_2_time: 100000200,
            challenge_3_time: 100000400,
            solve_success: 2,
            solve_fail: 1,
        };

        db.get.mockImplementation((query, params, callback) => {
            callback(null, mockRow);
        });

        const result = await findUserById('test@example.com');

        expect(result).toEqual(mockRow);
        expect(db.get).toHaveBeenCalled();
    });
});
