const router = require('express').Router();
const users = require('../components/users/userModel');

router.route('/register').post(users.register);

module.exports = router;