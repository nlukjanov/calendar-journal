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
        .json({ message: `Journal entry ${journalEntry.title} created` });
    })
    .catch((err) => {
      return res
        .status(422)
        .json({ message: 'somethings is wrong', error: err.message });
    });
}

function editJournalEntry(req, res) {
  Journal.findById(req.params.id)
    .then((journalEntry) => {
      if (!journalEntry)
        return res.status(404).json({ message: 'entry not found' });
      // here check if user is logged in
      // check if user is owner
      journalEntry.set(req.body);
      journalEntry.save();
      return res.status(202).json(journalEntry);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json({ message: 'somethings is wrong', error: err.message });
    });
}

module.exports = { index, createJournalEntry, editJournalEntry };
