const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../components/users/userModel');
function secureRoute(req, res, next) {
  if (!req.headers.authorization) {
    console.log('no authorization header sent');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  })
    .then((payload) => User.findById(payload.sub))
    .then((user) => {
      if (!user) {
        console.log('no user found');
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.currentUser = user;
      next();
    })
    .catch(() => res.status(401).json({ message: 'Unauthorized' }));
}
module.exports = secureRoute;
