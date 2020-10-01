const router = require('express').Router();
const users = require('../components/users/userController');
const journal = require('../components/journals/journalController');
const secureRoute = require('../lib/secureRoute');

router.route('/register').post(users.register);
router.route('/login').post(users.login);

router
  .route('/journal')
  .get(secureRoute, journal.index)
  .post(secureRoute, journal.create);

router
  .route('/journal/:id')
  .put(secureRoute, journal.edit)
  .delete(secureRoute, journal.destroy);

module.exports = router;
