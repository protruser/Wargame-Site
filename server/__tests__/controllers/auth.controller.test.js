const request = require('supertest');
const app = require('../../app');

jest.mock('../../services/auth.service', () => ({
    findUserById: jest.fn(),
    findUserByNickname: jest.fn(),
    createUser: jest.fn(),
    createUserChallenge: jest.fn(),
}));

const { findUserById, findUserByNickname, createUser, createUserChallenge } = require('../../services/auth.service');

describe('POST /api/auth/register', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const endpoint = '/api/auth/register';

    it('should return 400 if fields are missing', async () => {
        const res = await request(app).post(endpoint).send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Please enter all items.');
    });

    it('should return 400 if email is invalid', async () => {
        const res = await request(app).post(endpoint).send({
            id: 'invalid@email.com',
            nickname: 'tester',
            password: 'Aa1!aaaa',
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('It is not a valid email format.');
    });

    it('should return 400 if password is invalid', async () => {
        const res = await request(app).post(endpoint).send({
            id: 'test@seoultech.ac.kr',
            nickname: 'tester',
            password: 'abc123',
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Password must be at least');
    });

    it('should return 409 if email already exists', async () => {
        findUserById.mockResolvedValue(true);

        const res = await request(app).post(endpoint).send({
            id: 'test@seoultech.ac.kr',
            nickname: 'tester',
            password: 'Valid1!pass',
        });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Email already exists');
    });

    it('should return 409 if nickname already exists', async () => {
        findUserById.mockResolvedValue(null);
        findUserByNickname.mockResolvedValue(true);

        const res = await request(app).post(endpoint).send({
            id: 'test@seoultech.ac.kr',
            nickname: 'tester',
            password: 'Valid1!pass',
        });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Nickname already exists');
    });

    it('should return 201 if register successful', async () => {
        findUserById.mockResolvedValue(null);
        findUserByNickname.mockResolvedValue(null);
        createUser.mockResolvedValue();
        createUserChallenge.mockResolvedValue();

        const res = await request(app).post(endpoint).send({
            id: 'test@seoultech.ac.kr',
            nickname: 'tester',
            password: 'Valid1!pass',
        });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Register Success!');
    });

    it('should return 500 on unexpected error', async () => {
        findUserById.mockRejectedValue(new Error('Unexpected'));

        const res = await request(app).post(endpoint).send({
            id: 'test@seoultech.ac.kr',
            nickname: 'tester',
            password: 'Valid1!pass',
        });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Register Fail');
    });
});
