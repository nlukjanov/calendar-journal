const app = require('../index');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');

describe('Users router', () => {
  
  it('should have a register route', async () => {
    const res = await request(app).post('/register');
    expect(res.statusCode).toEqual(201);
  });
  it('should have a login route', async () => {
    const res = await request(app).post('/login');
    expect(res.statusCode).toEqual(202);
  });
  it('should have a my profile route', async () => {
    const res = await request(app).get('/myjournal');
    expect(res.statusCode).toEqual(200);
  });
});
