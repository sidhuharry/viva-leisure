import request from 'supertest';
import { app } from '../../src/app';

describe('Test  GET /list-tags', () => {
  test('It must return 401 without the auth key', async () => {
    const response = await request(app).get('/v1/api/list-tags');
    expect(response.status).toBe(401);
  });

  test('It must return list of tags with 200 OK', async () => {
    const response = await request(app)
      .get('/v1/api/list-tags')
      .set('x-api-key', 'hard-coded-key');
    expect(response.status).toBe(200);
  });
});
