const router = require('express').Router();
const users = require('../components/users/userController');

router.route('/register').post(users.register);
router.route('/login').post(users.login);
router.route('/myjournal').get(users.myjournal);

module.exports = router;