const User = require('./userModel');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

async function register(req, res) {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .json({ message: `Thank you for registering ${user.username}` });
  } catch (err) {
    return res
      .status(422)
      .json({ message: 'somethings is wrong', error: err.message });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = jwt.sign({ sub: user._id }, secret, {
      expiresIn: '24h'
    });
    return res
      .status(202)
      .json({ message: `Welcome back ${user.username}`, token });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

async function myjournal(req, res) {
  try {
    const user = await User.findById(req.currentUser._id);
    if (!user) throw new Error('Unauthorized');
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { register, login, myjournal };
