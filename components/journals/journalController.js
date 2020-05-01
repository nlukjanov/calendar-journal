const Journal = require('./journalModel');

function index(req, res) {
  return res.json('index');
}

function createJournalEntry(req, res) {
  Journal.create(req.body).then((journalEntry) => {
    return res
      .status(201)
      .json({ message: `Thank you for registering ${journalEntry.title}` });
  });
}

module.exports = { index, createJournalEntry };
