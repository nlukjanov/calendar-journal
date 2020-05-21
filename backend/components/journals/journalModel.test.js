import 'core-js/stable';
import 'regenerator-runtime/runtime';

const User = require('../users/userModel');
const Journal = require('./journalModel');

describe('Journal model', () => {
  it('should throw error if author is not present', async () => {
    const journalEntryNoAuthor = new Journal({
      title: 'Hello'
    });

    await expect(journalEntryNoAuthor.validate()).rejects.toThrow(
      'Journal validation failed: author: Path `author` is required.'
    );
  });

  it('should throw error if wrong data type is submitted', async () => {
    const journalEntryNoAuthor = new Journal({
      title: { a: 'b', c: 'd' }
    });

    await expect(journalEntryNoAuthor.validate()).rejects.toThrow(
      'Journal validation failed: title: Cast to string failed for value "{ a: \'b\', c: \'d\' }" at path "title", author: Path `author` is required.'
    );
  });

  it('should throw error if title is not present', async () => {
    const user = new User({
      username: 'userNoPass',
      email: 'userNoPass',
      password: 'pass',
      passwordConfirmation: 'pass'
    });

    const journalEntryNoTitle = new Journal({
      author: user
    });

    await expect(journalEntryNoTitle.validate()).rejects.toThrow(
      'Journal validation failed: title: Path `title` is required.'
    );
  });
});
