const User = require('../users/userModel');
const mongoose = require('mongoose');
const Journal = require('./journalModel');

const app = require('../../index');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');

const validUser = {
  username: 'nik',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'pass'
};

describe('Journal controller', () => {
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
    await Journal.deleteMany();
    await User.deleteMany();
  });

  it('should create a journal entry', async () => {
    const validAuthor = await User.create(validUser);
    const validJournalEntry = {
      author: validAuthor._id,
      title: 'title'
    };
    const res = await request(app).post('/journal').send(validJournalEntry);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      message: `Thank you for registering ${validJournalEntry.title}`
    });
    const journalFromDb = await Journal.findOne({ title: validJournalEntry.title });
    expect(journalFromDb.title).toEqual(validJournalEntry.title);
  });
});
