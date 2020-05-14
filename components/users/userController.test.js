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

  it('should login the user and return to json token', async () => {
    const createdToken = jwt.sign({ sub: validUser.username }, secret, {
      expiresIn: '24h'
    });
    const createdTokenPayload = jwt.verify(createdToken, secret);
    await request(app).post('/register').send(validUser);
    const res = await request(app).post('/login').send(validUser);
    const token = res.body.token;
    expect(res.body).toEqual({
      message: `Welcome back ${validUser.username}`,
      token
    });
    const returnedTokenPayload = jwt.verify(token, secret);
    expect(createdTokenPayload.sub).toEqual(returnedTokenPayload.sub);
  });

  it('should return user with all details', async () => {
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
    // create token
    const createdToken = jwt.sign({ sub: validUser.username }, secret, {
      expiresIn: '24h'
    });
    const res = await request(app)
      .get('/myjournal')
      .set('Authorization', 'Bearer ' + createdToken)
      .expect(200);
    await User.findOne({ username: validAuthor.username });
    expect(res.body.username).toEqual(validUser.username);
  });
});
