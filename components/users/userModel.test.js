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

    // await expect(userFromDb).toEqual(expect.objectContaining(savedUser));
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


  // below tests are written against mongoose validation, does not require db connection
  it('should throw error if password is not provided', async () => {
    expect.assertions(1);
    const userNoPass = new User({
      username: 'userNoPass',
      email: 'userNoPass'
    });
    await expect(() => userNoPass.validate()).rejects.toThrow(
      'User validation failed: password: Path `password` is required.'
    );
  });
  it('should throw error if username is not provided', async () => {
    expect.assertions(1);
    const userNoUsername = new User({
      email: 'userNoUsername',
      password: 'userNoUsername'
    });
    await expect(() => userNoUsername.validate()).rejects.toThrow(
      'User validation failed: username: Path `username` is required.'
    );
  });
  it('should throw error if email is not provided', async () => {
    expect.assertions(1);
    const userNoEmail = new User({
      username: 'userNoEmail',
      password: 'userNoEmail'
    });
    await expect(() => userNoEmail.validate()).rejects.toThrow(
      'User validation failed: email: Path `email` is required.'
    );
  });
});
