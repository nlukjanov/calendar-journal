const User = require('../users/userModel');
const mongoose = require('mongoose');
const Journal = require('./journalModel');

const app = require('../../app');
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
      message: `Journal entry ${validJournalEntry.title} created`
    });
    const journalFromDb = await Journal.findOne({
      title: validJournalEntry.title
    });
    expect(journalFromDb.title).toEqual(validJournalEntry.title);
  });

  it('should throw an error if something is wrong with entry', async () => {
    const authorId = mongoose.Types.ObjectId();
    const validJournalEntry = {
      author: authorId
    };
    const res = await request(app).post('/journal').send(validJournalEntry);
    expect(res.statusCode).toEqual(422);
  });

  it('should show all journal entries', async () => {
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
    const res = await request(app).get('/journal');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
    expect(res.body.length).toEqual(2);
    res.body.forEach((entry, index) => {
      expect(entry.author).toEqual(validEntries[index].author.toString());
      expect(entry.title).toBe(validEntries[index].title);
    });
  });
});
