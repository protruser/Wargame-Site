const { getChallenge } = require('../../services/challenge.service');
const db = require('../../config/db');

jest.mock('../../config/db');

describe('challenge.service - getChallenge (minimal test)', () => {
    test('should resolve with challenge row if found', async () => {
        const mockRow = {
            challenge_id: 1,
            title: 'Test Challenge',
            description: 'Sample description',
            port: '9001',
            flag: 'flag{test}',
            score: 100,
        };

        db.get.mockImplementation((query, params, callback) => {
            callback(null, mockRow);
        });

        const result = await getChallenge(1);

        expect(result).toEqual(mockRow);
        expect(db.get).toHaveBeenCalledWith(
            'SELECT * FROM challenges WHERE challenge_id = ?',
            [1],
            expect.any(Function)
        );
    });
});
