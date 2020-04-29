const User = require('../users/userModel');
const Journal = require('./journalModel');

describe('Journal model', () => {
  it('should throw error if author is not present', async () => {
    expect.assertions(1);
    const journalEntryNoAuthor = new Journal({
      title: 'Hello'
    });

    await expect(() => journalEntryNoAuthor.validate()).rejects.toThrow(
      'Journal validation failed: author: Path `author` is required.'
    );
  });

  it('should throw error if title is not present', async () => {
    expect.assertions(1);
    const user = new User({
      username: 'userNoPass',
      email: 'userNoPass',
      password: 'pass'
    });

    const journalEntryNoTitle = new Journal({
      author: user
    });

    await expect(() => journalEntryNoTitle.validate()).rejects.toThrow(
      'Journal validation failed: title: Path `title` is required.'
    );
  });
});
