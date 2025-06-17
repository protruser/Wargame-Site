const request = require('supertest');
const app = require('../app');

describe('App initialization and routing', () => {
    it('should respond to GET / with 200 and message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Server is running');
    });

    it('should respond with 404 to unknown routes', async () => {
        const res = await request(app).get('/not-a-real-route');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'Not Found' });
    });
});
