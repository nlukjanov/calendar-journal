import 'core-js/stable';
import 'regenerator-runtime/runtime';

const User = require('../users/userModel');
const Journal = require('./journalModel');

describe('Journal model', () => {
  it('should throw error if author is not present', async () => {
    const journalEntryNoAuthor = new Journal({
      title: 'Hello',
    });

    await expect(journalEntryNoAuthor.validate()).rejects.toThrow(
      'Journal validation failed: author: Path `author` is required.',
    );
  });

  it('should throw error if wrong data type is submitted', async () => {
    const journalEntryNoAuthor = new Journal({
      title: { a: 'b', c: 'd' },
    });

    await expect(journalEntryNoAuthor.validate()).rejects.toThrow(
      'Journal validation failed: title: Cast to string failed for value "{ a: \'b\', c: \'d\' }" at path "title", author: Path `author` is required.',
    );
  });

  let user;

  describe('User actions with journal', () => {
    beforeEach(async () => {
      user = new User({
        username: 'user',
        email: 'user',
        password: 'pass',
        passwordConfirmation: 'pass',
      });
    });
    it('should throw error if title is not present', async () => {
      const journalEntryNoTitle = new Journal({
        author: user,
      });

      await expect(journalEntryNoTitle.validate()).rejects.toThrow(
        'Journal validation failed: title: Path `title` is required.',
      );
    });

    it('journal model should have entry text', () => {
      const journalEntryWithText = new Journal({
        author: user,
        title: 'entry with title',
        entryText: 'entry text',
      });

      expect(journalEntryWithText.entryText).toStrictEqual('entry text');
    });

    it('journal model should have date field', () => {
      const dateNow = new Date();
      const journalEntryWithText = new Journal({
        author: user,
        title: 'entry with title',
        entryText: 'entry text',
        date: dateNow,
      });

      expect(journalEntryWithText.date).toStrictEqual(dateNow);
    });

    it('journal model should not accept fields different from set in the model', () => {
      const journalEntryWithText = new Journal({
        author: user,
        title: 'entry with title',
        entryText: 'entry text',
        somethingElse: 'something else',
      });

      expect(journalEntryWithText.somethingElse).toStrictEqual(undefined);
    });
  });
});
