const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');
const logger = require('./lib/logger');
const mongoose = require('mongoose');
const router = require('./config/router');

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

app.use(bodyParser.json());
app.use(logger);

app.use(router);

app.get('/', (req, res) => res.send('Hello World'));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbURI, mongooseConfig, (err) => {
    if (err) return console.log('app in index cannot connect to mongodb', err);
    console.log(`Mongo is connected to '${dbURI}'`);
  });
  app.listen(port, () =>
    console.log(`Express app listening at http://localhost:${port}`)
  );
}

module.exports = app;
