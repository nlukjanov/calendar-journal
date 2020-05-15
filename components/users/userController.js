const User = require('./userModel');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

function register(req, res) {
  User.create(req.body)
    .then((user) =>
      res
        .status(201)
        .json({ message: `Thank you for registering ${user.username}` })
    )
    .catch((err) => {
      return res
        .status(422)
        .json({ message: 'somethings is wrong', error: err.message });
    });
}

function login(req, res) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const token = jwt.sign({ sub: user._id }, secret, {
        expiresIn: '24h'
      });
      return res
        .status(202)
        .json({ message: `Welcome back ${user.username}`, token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ message: 'Unauthorized' });
    });
}

function myjournal(req, res) {
  User.findById(req.currentUser._id)
    .populate('journalEntries')
    .then((user) => {
      if (!user) throw new Error('Unauthorized');
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ message: 'Unauthorized' });
    });
}

module.exports = { register, login, myjournal };
