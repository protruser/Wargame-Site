const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../../utils/jwt');

describe('jwt utils', () => {
    const payload = { id: 'user123', nickname: 'tester' };

    it('should generate a valid token and verify it', () => {
        const token = generateToken(payload, '1h');
        const decoded = verifyToken(token);

        expect(typeof token).toBe('string');
        expect(decoded).toMatchObject(payload);
    });

    it('should return null for invalid token', () => {
        const invalidToken = 'invalid.token.value';
        const result = verifyToken(invalidToken);

        expect(result).toBeNull();
    });

    it('should return null for expired token', (done) => {
        const token = generateToken(payload, '1ms');

        setTimeout(() => {
            const result = verifyToken(token);
            expect(result).toBeNull();
            done();
        }, 10);
    });
});
