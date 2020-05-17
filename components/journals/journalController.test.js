const User = require('../users/userModel');
const mongoose = require('mongoose');
const Journal = require('./journalModel');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const app = require('../../app');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');

const validUser = {
  username: 'nik',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'pass'
};

let createdUser;
let createdEntries;
let createdToken;

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

  beforeEach(async () => {
    createdUser = await User.create(validUser);
    createdEntries = await Journal.insertMany([
      {
        author: createdUser._id,
        title: 'title1'
      },

      {
        author: createdUser._id,
        title: 'title2'
      }
    ]);
  });

  afterEach(async () => {
    await Journal.deleteMany();
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return 401 if user is not logged in (jwt not sent)', async () => {
    const postRes = await request(app).post('/journal');
    expect(postRes.statusCode).toEqual(401);
    const getRes = await request(app).get('/journal');
    expect(getRes.statusCode).toEqual(401);
    const editRes = await request(app).put('/journal/anyId');
    expect(editRes.statusCode).toEqual(401);
    const deleteRes = await request(app).delete('/journal/anyId');
    expect(deleteRes.statusCode).toEqual(401);
  });

  describe('logged in user Journal actions', () => {
    beforeEach(async () => {
      createdToken = jwt.sign({ sub: validUser.username }, secret, {
        expiresIn: '24h'
      });
    });

    it('should create a journal entry', async () => {
      const validEntry = {
        author: createdUser._id,
        title: 'title1'
      };
      const res = await request(app)
        .post('/journal')
        .set('Authorization', 'Bearer ' + createdToken)
        .send(validEntry);
      const journalFromDb = await Journal.findById(createdEntries[0]._id);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        message: `Journal entry ${createdEntries[0].title} created`
      });
      expect(journalFromDb.title).toEqual(createdEntries[0].title);
    });

    it('should throw an error if entry is invalid', async () => {
      const authorId = mongoose.Types.ObjectId();
      const invalidJournalEntry = {
        author: authorId
      };
      const res = await request(app)
        .post('/journal')
        .set('Authorization', 'Bearer ' + createdToken)
        .send(invalidJournalEntry);
      expect(res.statusCode).toEqual(422);
    });

    it('should show all journal entries', async () => {
      const res = await request(app)
        .get('/journal')
        .set('Authorization', 'Bearer ' + createdToken);
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body.length).toEqual(2);
      res.body.forEach((entry, index) => {
        expect(entry.author).toEqual(createdEntries[index].author.toString());
        expect(entry.title).toBe(createdEntries[index].title);
      });
    });

    it('should edit journal entry', async () => {
      const entryEdit = {
        author: createdUser._id,
        title: 'title1',
        body: 'some body text'
      };
      const entryToEdit = await Journal.findOne({ title: 'title1' });
      const res = await request(app)
        .put(`/journal/${entryToEdit._id}`)
        .set('Authorization', 'Bearer ' + createdToken)
        .send(entryEdit)
        .expect(202);
      expect(res.body.body).toEqual(entryEdit.body);
      expect(res.body.author).toEqual(entryEdit.author.toString());
      expect(res.body.title).toEqual(entryEdit.title);
    });

    it('should throw and error if no entry found', async () => {
      const invalidEntryId = mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/journal/${invalidEntryId}`)
        .set('Authorization', 'Bearer ' + createdToken);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ message: 'entry not found' });
    });

    it('should delete journal entry', async () => {
      const entryToDelete = await Journal.findById(createdEntries[0]._id);
      const res = await request(app)
        .delete(`/journal/${entryToDelete._id}`)
        .set('Authorization', 'Bearer ' + createdToken);
      expect(res.status).toEqual(204);
      const deletedEntry = await Journal.findById(entryToDelete._id);
      expect(deletedEntry).toEqual(null);
    });

    it('should throw error if journal entry not found', async () => {
      const invalidEntryId = mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/journal/${invalidEntryId._id}`)
        .set('Authorization', 'Bearer ' + createdToken);
      expect(res.status).toEqual(404);
    });
  });
});
