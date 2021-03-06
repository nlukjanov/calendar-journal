const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const User = require('../users/userModel');
const Journal = require('./journalModel');
const { secret } = require('../../config/environment');

const app = require('../../app');
// eslint-disable-next-line node/no-unpublished-require

let createdUsers;
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
      },
    );
  });

  beforeEach(async () => {
    createdUsers = await User.insertMany([
      {
        username: 'nik',
        email: 'email',
        password: 'pass',
        passwordConfirmation: 'pass',
      },
      {
        username: 'nik2',
        email: 'email',
        password: 'pass',
        passwordConfirmation: 'pass',
      },
    ]);
    createdEntries = await Journal.insertMany([
      {
        author: createdUsers[0]._id,
        title: 'title1',
      },
      {
        author: createdUsers[0]._id,
        title: 'title2',
      },

      {
        author: createdUsers[1]._id,
        title: 'title1 by user2',
      },
      {
        author: createdUsers[1]._id,
        title: 'title2 by user2',
      },
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

  describe('unable to work with journal entries if not logged in', () => {
    it('should return 401 if user is not logged in (jwt not sent)', async () => {
      const postRes = await request(app).post('/api/journal');
      expect(postRes.statusCode).toEqual(401);
      const getRes = await request(app).get('/api/journal');
      expect(getRes.statusCode).toEqual(401);
      const editRes = await request(app).put('/api/journal/anyId');
      expect(editRes.statusCode).toEqual(401);
      const deleteRes = await request(app).delete('/api/journal/anyId');
      expect(deleteRes.statusCode).toEqual(401);
    });

    it('should return 401 if wrong user sends token', async () => {
      createdToken = jwt.sign({ sub: createdUsers[1]._id }, secret, {
        expiresIn: '24h',
      });

      const postRes = await request(app).post('/api/journal');
      expect(postRes.statusCode).toEqual(401);
      const getRes = await request(app).get('/api/journal');
      expect(getRes.statusCode).toEqual(401);
      const editRes = await request(app)
        .put(`/api/journal/${createdEntries[0]._id}`)
        .set('Authorization', `Bearer ${createdToken}`);
      expect(editRes.statusCode).toEqual(401);
      const deleteRes = await request(app)
        .delete(`/api/journal/${createdEntries[0]._id}`)
        .set('Authorization', `Bearer ${createdToken}`);
      expect(deleteRes.statusCode).toEqual(401);
    });
  });

  describe('logged in user Journal actions', () => {
    beforeEach(async () => {
      createdToken = jwt.sign({ sub: createdUsers[0]._id }, secret, {
        expiresIn: '24h',
      });
    });

    it('should create a journal entry', async () => {
      const validEntry = {
        author: createdUsers[0]._id,
        title: 'title1',
      };
      const res = await request(app)
        .post('/api/journal')
        .set('Authorization', `Bearer ${createdToken}`)
        .send(validEntry);
      const journalFromDb = await Journal.findById(createdEntries[0]._id);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        message: `Journal entry ${createdEntries[0].title} created`,
      });
      expect(journalFromDb.title).toEqual(createdEntries[0].title);
    });

    it('should throw an error if entry is invalid', async () => {
      const authorId = mongoose.Types.ObjectId();
      const invalidJournalEntry = {
        author: authorId,
      };
      const res = await request(app)
        .post('/api/journal')
        .set('Authorization', `Bearer ${createdToken}`)
        .send(invalidJournalEntry);
      expect(res.statusCode).toEqual(422);
    });

    it('should show all journal entries for particular user', async () => {
      const res = await request(app)
        .get('/api/journal')
        .set('Authorization', `Bearer ${createdToken}`);
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
        author: createdUsers[0]._id,
        title: 'title1',
        entryText: 'some body text',
      };
      const entryToEdit = await Journal.findOne({ title: 'title1' });
      const res = await request(app)
        .put(`/api/journal/${entryToEdit._id}`)
        .set('Authorization', `Bearer ${createdToken}`)
        .send(entryEdit)
        .expect(202);
      expect(res.body.body).toEqual(entryEdit.body);
      expect(res.body.author).toEqual(entryEdit.author.toString());
      expect(res.body.title).toEqual(entryEdit.title);
    });

    it('should throw and error if no entry found', async () => {
      const invalidEntryId = mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/journal/${invalidEntryId}`)
        .set('Authorization', `Bearer ${createdToken}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ message: 'entry not found' });
    });

    it('should delete journal entry', async () => {
      const entryToDelete = await Journal.findById(createdEntries[0]._id);
      const res = await request(app)
        .delete(`/api/journal/${entryToDelete._id}`)
        .set('Authorization', `Bearer ${createdToken}`);
      expect(res.status).toEqual(204);
      const deletedEntry = await Journal.findById(entryToDelete._id);
      expect(deletedEntry).toEqual(null);
    });

    it('should throw error if journal entry not found', async () => {
      const invalidEntryId = mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/journal/${invalidEntryId._id}`)
        .set('Authorization', `Bearer ${createdToken}`);
      expect(res.status).toEqual(404);
    });
  });
});
