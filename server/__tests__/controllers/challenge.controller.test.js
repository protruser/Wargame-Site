const request = require('supertest');
const express = require('express');
const challengeController = require('../../controllers/challenge.controller');

jest.mock('../../services/challenge.service', () => ({
    getChallenge: jest.fn(),
    updateSuccess: jest.fn(),
    updateFail: jest.fn(),
}));

jest.mock('../../config/db', () => ({
    get: jest.fn(),
}));

const db = require('../../config/db');
const challengeService = require('../../services/challenge.service');

const app = express();
app.use(express.json());

// Mock middleware to inject user
app.use((req, res, next) => {
    req.user = { user_id: 'test_user' };
    next();
});

app.post('/api/challenges/submit', challengeController.submitAnswer);

describe('submitAnswer (partial test)', () => {
    afterEach(() => jest.clearAllMocks());

    test('returns 200 and correct message when flag is correct', async () => {
        // DB returns 0 (unsolved)
        db.get.mockImplementation((query, params, callback) => {
            callback(null, { challenge_1_time: 0 });
        });

        // Challenge info
        challengeService.getChallenge.mockResolvedValue({
            challenge_id: 1,
            flag: 'flag{correct}',
            score: 100,
        });

        const res = await request(app)
            .post('/api/challenges/submit')
            .send({ challenge_id: 1, submitted_flag: 'flag{correct}' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('✅ Correct!');
        expect(challengeService.updateSuccess).toHaveBeenCalled();
    });

    test('returns 404 when challenge not found', async () => {
        db.get.mockImplementation((query, params, callback) => {
            callback(null, { challenge_1_time: 0 });
        });

        challengeService.getChallenge.mockResolvedValue(null); // Challenge not found

        const res = await request(app)
            .post('/api/challenges/submit')
            .send({ challenge_id: 1, submitted_flag: 'flag{anything}' });

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Challenge not found');
    });
});
