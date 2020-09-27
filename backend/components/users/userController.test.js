const User = require('./userModel');
const Journal = require('../journals/journalModel');
const mongoose = require('mongoose');
const app = require('../../app');
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

const notExistingUser = {
  username: 'niki',
  email: 'nikimail',
  password: 'notpass',
  passwordConfirmation: 'notpass'
};

const invalidUser = {
  username: 'nik',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'notpass'
};

const wrongPassUser = {
  username: 'nik',
  email: 'email',
  password: 'notpass',
  passwordConfirmation: 'notpass'
};

const userLogin = {
  email: 'email',
  password: 'pass'
};

describe('User controller', () => {
  beforeEach(async () => {
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

  afterEach(async () => {
    await User.deleteMany();
    await Journal.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(validUser)
      .expect(201);
    expect(res.body).toEqual({
      message: `Thank you for registering ${validUser.username}`
    });
    const userFromDb = await User.findOne({ username: validUser.username });
    expect(userFromDb.username).toEqual(validUser.username);
    expect(userFromDb.email).toEqual(validUser.email);
  });

  it('should throw an error if user data is incorrect', async () => {
    const res = await request(app).post('/api/register').send(invalidUser);
    expect(res.statusCode).toEqual(422);
  });

  it('should login the user and return json token', async () => {
    const createdUser = await User.create(validUser);
    const createdToken = jwt.sign({ sub: createdUser._id }, secret, {
      expiresIn: '24h'
    });
    const createdTokenPayload = jwt.verify(createdToken, secret);
    const res = await request(app).post('/api/login').send(userLogin);
    const token = res.body.token;
    expect(res.body).toEqual({
      message: `Welcome back ${validUser.username}`,
      token
    });
    const returnedTokenPayload = jwt.verify(token, secret);
    expect(createdTokenPayload.sub).toEqual(returnedTokenPayload.sub);
  });

  it('should return 404 if user is not found', async () => {
    await User.create(validUser);
    const res = await request(app).post('/api/login').send(notExistingUser);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ message: 'Incorrect credentials' });
  });

  it('should return 401 if passwords not match', async () => {
    await User.create(validUser);
    const res = await request(app).post('/api/login').send(wrongPassUser);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ message: 'Incorrect credentials' });
  });
});
