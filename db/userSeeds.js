const mongoose = require('mongoose');
const { dbURI } = require('../backend/config/environment');

const User = require('../backend/components/users/userModel');
const Journal = require('../backend/components/journals/journalModel');

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err);
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'Nik',
            email: 'nik@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'Kin',
            email: 'kin@mail',
            password: 'pass1',
            passwordConfirmation: 'pass1'
          }
        ]).then((createdUsers) => {
          console.log(`${createdUsers.length} users created`);
          return Journal.create([
            {
              author: createdUsers[0]._id,
              title: 'title1',
              entryText: 'text1'
            },
            {
              author: createdUsers[0]._id,
              title: 'title2',
              entryText: 'text2'
            },

            {
              author: createdUsers[1]._id,
              title: 'title1 by user2',
              entryText: 'text1 by user2'
            },
            {
              author: createdUsers[1]._id,
              title: 'title2 by user2',
              entryText: 'text1 by user2'
            }
          ]);
        });
      })
      .then((createdJournalEntries) => console.log(`${createdJournalEntries.length} journal entries created`))
      .catch((err) => console.log(err))
      .finally(() => mongoose.connection.close());
  }
);
