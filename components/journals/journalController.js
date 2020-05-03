const Journal = require('./journalModel');

function index(req, res) {
  Journal.find()
    .then((entries) => {
      return res.status(200).json(entries);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'somethings is wrong', error: err.message });
    });
}

function createJournalEntry(req, res) {
  Journal.create(req.body)
    .then((journalEntry) => {
      return res
        .status(201)
        .json({ message: `Journal entry created ${journalEntry.title}` });
    })
    .catch((err) => {
      return res
        .status(422)
        .json({ message: 'somethings is wrong', error: err.message });
    });
}

module.exports = { index, createJournalEntry };
