const User = require('./userModel');
const mongoose = require('mongoose');
const userData = {
  username: 'nik',
  email: 'email',
  password: 'pass'
};

describe('User model', () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true },
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
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.gender).toBe(userData.gender);
    expect(savedUser.dob).toBe(userData.dob);
    expect(savedUser.loginUsing).toBe(userData.loginUsing);
  });

  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User({
      username: 'nik',
      email: 'email',
      password: 'pass',
      invalidField: 'invalid'
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.invalidField).toBeUndefined();
  });

  it('create user without required field should failed', async () => {
    const userWithoutRequiredField = new User({ name: 'TekLoon' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      // eslint-disable-next-line no-undef
      error = savedUserWithoutRequiredField;
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
