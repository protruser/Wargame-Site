const request = require('supertest');
const express = require('express');
const myScoreController = require('../../controllers/myscore.controller');
const myScoreService = require('../../services/myscore.service');

jest.mock('../../services/myscore.service');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    req.user = { nickname: 'testuser' };
    next();
});

app.get('/api/score/:nickname', myScoreController.getScoreByNickname);
app.get('/api/score/me', myScoreController.getMyScore);

describe('myscore.controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getScoreByNickname', () => {
        it('should return score when user exists', async () => {
            const mockScore = { nickname: 'testuser', total_score: 100 };
            myScoreService.findScoreByNickname.mockResolvedValue(mockScore);

            const res = await request(app).get('/api/score/testuser');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockScore);
        });

        it('should return 404 when user not found', async () => {
            myScoreService.findScoreByNickname.mockResolvedValue(null);

            const res = await request(app).get('/api/score/unknown');

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: 'User not found' });
        });

        it('should return 500 on service error', async () => {
            myScoreService.findScoreByNickname.mockRejectedValue(new Error('DB error'));

            const res = await request(app).get('/api/score/testuser');

            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to fetch score' });
        });
    });

    describe('getMyScore', () => {
        it("should return logged-in user's score", async () => {
            const mockScore = { nickname: 'testuser', total_score: 150 };
            myScoreService.findScoreByNickname.mockResolvedValue(mockScore);

            const res = await request(app).get('/api/score/me');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockScore);
        });

        it('should return 404 when logged-in user score not found', async () => {
            myScoreService.findScoreByNickname.mockResolvedValue(null);

            const res = await request(app).get('/api/score/me');

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({ error: 'User not found' });
        });

        it('should return 500 if service throws error', async () => {
            myScoreService.findScoreByNickname.mockRejectedValue(new Error('Unexpected error'));

            const res = await request(app).get('/api/score/me');

            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to fetch score' });
        });
    });
});
