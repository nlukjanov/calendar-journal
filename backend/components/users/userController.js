const User = require('./userModel');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

async function register(req, res, next) {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .json({ message: `Thank you for registering ${user.username}` });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
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
  } catch (err) {
    next(err);
  }
}
module.exports = { register, login };
