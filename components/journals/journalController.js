const Journal = require('./journalModel');

async function index(req, res) {
  try {
    const entries = await Journal.find();
    return res.status(200).json(entries);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'somethings is wrong', error: err.message });
  }
}

async function create(req, res) {
  try {
    const journalEntry = await Journal.create(req.body);
    return res
      .status(201)
      .json({ message: `Journal entry ${journalEntry.title} created` });
  } catch (err) {
    return res
      .status(422)
      .json({ message: 'somethings is wrong', error: err.message });
  }
}

async function edit(req, res) {
  try {
    const foundEntry = await Journal.findById(req.params.id);
    if (!foundEntry)
      return res.status(404).json({ message: 'entry not found' });
    if (!foundEntry.author.equals(req.currentUser._id))
      return res.status(401).json({ message: 'Unauthorized' });
    foundEntry.set(req.body);
    foundEntry.save();
    return res.status(202).json(foundEntry);
  } catch (err) {
    console.log(err);
    res
      .status(422)
      .json({ message: 'somethings is wrong', error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const foundEntry = await Journal.findById(req.params.id);
    if (!foundEntry)
      return res.status(404).json({ message: 'entry not found' });
    if (!foundEntry.author.equals(req.currentUser._id))
      return res.status(401).json({ message: 'Unauthorized' });
    foundEntry.deleteOne();
    return res.status(204).json({ message: 'delete' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'somethings is wrong', error: err.message });
  }
}

module.exports = { index, create, edit, destroy };
