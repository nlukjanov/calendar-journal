const app = require('./index');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');

describe('index test', () => {
  it('calling / should return Hello World ', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hello World');
  });
});
