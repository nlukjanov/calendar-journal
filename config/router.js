const router = require('express').Router();
const users = require('../components/users/userController');
const journal = require('../components/journals/journalController');
const secureRoute = require('../lib/secureRoute');

router.route('/register').post(users.register);
router.route('/login').post(users.login);
router.route('/myjournal').get(secureRoute, users.myjournal);

router.route('/journal').get(journal.index).post(journal.createJournalEntry);

module.exports = router;
