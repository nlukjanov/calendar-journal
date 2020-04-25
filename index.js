const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');
const logger = require('./lib/logger');

app.use(bodyParser.json());
app.use(logger);

app.get('/', (req, res) => res.send({ message: 'Hello World!' }));
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () =>
    console.log(`Express app listening at http://localhost:${port}`)
  );
}

module.exports = app;
