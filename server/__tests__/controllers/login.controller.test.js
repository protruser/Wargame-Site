const { login } = require('../../controllers/login.controller');
const authService = require('../../services/auth.service');
const hashUtil = require('../../utils/hash');
const jwtUtil = require('../../utils/jwt');

jest.mock('../../services/auth.service');
jest.mock('../../utils/hash');
jest.mock('../../utils/jwt');

describe('Auth Controller - login (minimal test)', () => {
    test('should return 200 and token if login is successful', async () => {
        const req = {
            body: {
                id: 'user@example.com',
                password: 'ValidPassword123!',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockUser = {
            user_id: 'user@example.com',
            nickname: 'tester',
            password: 'hashed',
            total_score: 100,
            challenge_1_time: 0,
            challenge_2_time: 0,
            challenge_3_time: 0,
            solve_success: 1,
            solve_fail: 0,
        };

        authService.findUserById.mockResolvedValue(mockUser);
        hashUtil.comparePassword.mockResolvedValue(true);
        jwtUtil.generateToken.mockReturnValue('mock.jwt.token');

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'login success',
                token: 'mock.jwt.token',
            })
        );
    });
});
