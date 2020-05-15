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

function create(req, res) {
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

function edit(req, res) {
  Journal.findById(req.params.id)
    .then((foundEntry) => {
      if (!foundEntry)
        return res.status(404).json({ message: 'entry not found' });
      // here check if user is logged in
      // check if user is owner
      foundEntry.set(req.body);
      foundEntry.save();
      return res.status(202).json(foundEntry);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(422)
        .json({ message: 'somethings is wrong', error: err.message });
    });
}

function destroy(req, res) {
  Journal.findById(req.params.id)
    .then((foundEntry) => {
      if (!foundEntry)
        return res.status(404).json({ message: 'entry not found' });
      foundEntry.deleteOne();
      return res.status(204).json({ message: 'delete' });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'somethings is wrong', error: err.message });
    });
}

module.exports = { index, create, edit, destroy };
