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

function login(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) throw new Error('User not found');
      if (!user.validatePassword(req.body.password)) {
        throw new Error('Incorrect credentials');
      }
      const token = jwt.sign({ sub: user._id }, secret, {
        expiresIn: '24h'
      });
      return res
        .status(202)
        .json({ message: `Welcome back ${user.username}`, token });
    })
    .catch((err) => {
      if (err.message === 'User not found') {
        return res.status(401).json({ error: 'No such user' });
      }
      if (err.message === 'Incorrect credentials') {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
      return res.status(401).json({ error: 'Unauthorized' });
    });
}
module.exports = { register, login };
