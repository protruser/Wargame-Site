const { deleteAccount } = require('../../controllers/user.controller');
const db = require('../../config/db');

jest.mock('../../config/db');

describe('User Controller - deleteAccount (minimal test)', () => {
    test('should return 403 if token user_id and param user_id do not match', async () => {
        const req = {
            user: { user_id: 'token_user@example.com' },
            params: { user_id: 'param_user@example.com' },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteAccount(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            error: '🚫 You are not authorized to delete this account',
        });
    });
});
