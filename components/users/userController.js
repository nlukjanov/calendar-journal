const User = require('./userModel');

function register(req, res, next) {
  User.create(req.body)
    .then((user) =>
      res
        .status(201)
        .json({ message: `Thank you for registering ${user.username}` })
    )
    .catch(next);
}

function login(req, res) {
  return res.status(202).json('login');
}

function myjournal(req, res) {
  return res.status(200).json('myjournal');
}

module.exports = { register, login, myjournal };
