const router = require('express').Router();
const users = require('../components/users/userController');
const journal = require('../components/journals/journalController');

router.route('/register').post(users.register);
router.route('/login').post(users.login);
router.route('/myjournal').get(users.myjournal);

router.route('/journal').get(journal.index).post(journal.createJournalEntry);

module.exports = router;
