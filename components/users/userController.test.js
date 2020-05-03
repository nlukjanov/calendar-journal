const User = require('./userModel');
const mongoose = require('mongoose');
const app = require('../../index');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const validUser = {
  username: 'nik',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'pass'
};
const invalidUser = {
  username: 'nik',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'notpass'
};

describe('User controller', () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should create a user', async () => {
    const res = await request(app).post('/register').send(validUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      message: `Thank you for registering ${validUser.username}`
    });
    const userFromDb = await User.findOne({ username: validUser.username });
    expect(userFromDb.username).toEqual(validUser.username);
    expect(userFromDb.email).toEqual(validUser.email);
  });

  it('should throw an error if user data is incorrect', async () => {
    const res = await request(app).post('/register').send(invalidUser);
    expect(res.statusCode).toEqual(422);
  });

  it('should login the user and return to json token', async () => {
    const setToken = jwt.sign({ sub: validUser.username }, secret, {
      expiresIn: '24h'
    });
    const setTokenPayload = jwt.verify(setToken, secret);
    await request(app).post('/register').send(validUser);
    const res = await request(app).post('/login').send(validUser);
    const token = res.body.token;
    expect(res.body).toEqual({
      message: `Welcome back ${validUser.username}`,
      token
    });
    const returnedTokenPayload = jwt.verify(token, secret);
    expect(setTokenPayload.sub).toEqual(returnedTokenPayload.sub);
  });
});
