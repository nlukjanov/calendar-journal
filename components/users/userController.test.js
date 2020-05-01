const User = require('./userModel');
const mongoose = require('mongoose');
const app = require('../../index');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');

const validUser = {
  username: 'nik',
  email: 'email',
  password: 'pass'
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
    expect(userFromDb).toEqual(expect.objectContaining(validUser));
  });
  
});
