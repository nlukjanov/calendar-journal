import 'core-js/stable';
import 'regenerator-runtime/runtime';

const User = require('./userModel');
const mongoose = require('mongoose');
const userData = {
  username: 'nik',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'pass'
};

describe('User model', () => {
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

  it('create & save user successfully', async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    const userFromDb = await User.findOne({ username: savedUser.username });
    expect(userFromDb).toMatchObject(savedUser._doc);
  });

  it('throw error if passing extra fields when creating user', async () => {
    let err;

    try {
      new User({
        username: 'nik',
        email: 'email',
        password: 'pass',
        invalidField: 'invalid'
      });
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error);
    expect(err.message).toEqual(
      'Field `invalidField` is not in schema and strict mode is set to throw.'
    );
  });

  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new User({ username: 'nik' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors).toBeDefined();
  });

  it('should encrypt passwords', async () => {
    const user = await User.create(userData);
    const userFromDb = await User.findOne({ username: user.username });
    expect(userFromDb.password).not.toEqual(userData.password);
  });
});
