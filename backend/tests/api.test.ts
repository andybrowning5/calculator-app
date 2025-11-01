import request from 'supertest';
import app from '../src/app';

describe('API', () => {
  it('returns ok on /healthz', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('calculates valid expressions', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ expression: '3+4*2' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(11);
  });

  it('rejects invalid expressions', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ expression: 'alert(1)' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});
