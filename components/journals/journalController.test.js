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

  afterEach(async () => {
    await Journal.deleteMany();
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
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

  it('should throw an error if entry is invalid', async () => {
    const authorId = mongoose.Types.ObjectId();
    const invalidJournalEntry = {
      author: authorId
    };
    const res = await request(app).post('/journal').send(invalidJournalEntry);
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

  it('should edit journal entry', async () => {
    const validAuthor = await User.create(validUser);
    const validEntry = {
      author: validAuthor._id,
      title: 'title1'
    };
    const entryEdit = {
      author: validAuthor._id,
      title: 'title1',
      body: 'some body text'
    };
    await Journal.create(validEntry);
    const entryToEdit = await Journal.findOne({ title: 'title1' });
    const res = await request(app)
      .put(`/journal/${entryToEdit._id}`)
      .send(entryEdit)
      .expect(202);
    expect(res.body.body).toEqual(entryEdit.body);
    expect(res.body.author).toEqual(entryEdit.author.toString());
    expect(res.body.title).toEqual(entryEdit.title);
  });

  it('should throw and error if no entry found', async () => {
    const validAuthor = await User.create(validUser);
    const entryEdit = {
      author: validAuthor._id,
      body: 'some body stuff'
    };
    const invalidEntryId = mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/journal/${invalidEntryId}`)
      .send(entryEdit);
    expect(res.statusCode).toEqual(404);
  });

  it('should delete journal entry', async () => {
    const validAuthor = await User.create(validUser);
    const validEntry = {
      author: validAuthor._id,
      title: 'title1'
    };
    await Journal.create(validEntry);
    const entryToDelete = await Journal.findOne({ title: 'title1' });
    const res = await request(app).delete(`/journal/${entryToDelete._id}`);
    expect(res.status).toEqual(204);
    const deletedEntry = await Journal.findById(entryToDelete._id);
    expect(deletedEntry).toEqual(null);
  });

  it('should throw error if journal entry not found', async () => {
    const invalidEntryId = mongoose.Types.ObjectId();
    const res = await request(app).delete(`/journal/${invalidEntryId._id}`);
    expect(res.status).toEqual(404);
  });
});
