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
      .post('/register')
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
    const res = await request(app).post('/register').send(invalidUser);
    expect(res.statusCode).toEqual(422);
  });

  it('should login the user and return json token', async () => {
    const createdUser = await User.create(validUser);
    const createdToken = jwt.sign({ sub: createdUser._id }, secret, {
      expiresIn: '24h'
    });
    const createdTokenPayload = jwt.verify(createdToken, secret);
    const res = await request(app).post('/login').send(validUser);
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
    const res = await request(app).post('/login').send(wrongPassUser);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ message: 'Unauthorized' });
  });

  it('should return user data with populated journal entries', async () => {
    const validAuthor = await User.create(validUser);
    const validEntries = [
      {
        author: validAuthor._id,
        title: 'title1'
      },

      {
        author: validAuthor._id,
        title: 'title2'
      }
    ];
    await Journal.create(validEntries[0]);
    await Journal.create(validEntries[1]);
    const createdToken = jwt.sign({ sub: validUser.username }, secret, {
      expiresIn: '24h'
    });
    const res = await request(app)
      .get('/myjournal')
      .set('Authorization', 'Bearer ' + createdToken)
      .expect(200);
    await User.findById(validAuthor._id);
    expect(res.body.username).toEqual(validUser.username);
    expect(res.body.journalEntries[0].title).toEqual(validEntries[0].title);
    expect(res.body.journalEntries[1].title).toEqual(validEntries[1].title);
  });
});
