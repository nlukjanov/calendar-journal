/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

const User = require('../components/users/userModel');
const Journal = require('../components/journals/journalModel');

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);
    return mongoose.connection
      .dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'Nik',
            email: 'nik@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
          },
          {
            username: 'Kin',
            email: 'kin@mail',
            password: 'pass1',
            passwordConfirmation: 'pass1',
          },
        ]).then((createdUsers) => {
          console.log(`${createdUsers.length} users created`);
          return Journal.create([
            {
              author: createdUsers[0]._id,
              title: 'title1',
              entryText: 'text1',
            },
            {
              author: createdUsers[0]._id,
              title: 'title2',
              entryText: 'text2',
            },

            {
              author: createdUsers[1]._id,
              title: 'title1 by user2',
              entryText: 'text1 by user2',
            },
            {
              author: createdUsers[1]._id,
              title: 'title2 by user2',
              entryText: 'text1 by user2',
            },
          ]);
        });
      })
      .then((createdJournalEntries) =>
        console.log(`${createdJournalEntries.length} journal entries created`),
      )
      .catch((error) => console.log(error))
      .finally(() => mongoose.connection.close());
  },
);
