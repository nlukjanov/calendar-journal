const User = require('./userModel');

describe('User model', () => {
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
