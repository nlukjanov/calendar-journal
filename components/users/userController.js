function register(req, res) {
  return res.status(201).json('register');
}

function login(req, res) {
  return res.status(202).json('login');
}

function myjournal(req, res) {
  return res.status(200).json('myjournal');
}

module.exports = { register, login, myjournal };
