import request from 'supertest';
import { app } from '../src/server';

describe('User Routes', () => {
    it('GET / should return 401 without bearer token', async () => {
        const response = await request(app).get('/dogs');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized: Invalid or missing token.');
    });
});
