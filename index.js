const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');
const logger = require('./lib/logger');
const mongoose = require('mongoose');

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

app.use(bodyParser.json());
app.use(logger);

app.get('/', (req, res) => res.send('Hello World'));
app.post('/register', (req, res) => res.status(201).json('hello'));
app.post('/login', (req, res) => res.status(202).json('hello'));
app.post('/myjournal', (req, res) => res.status(200).json('hello'));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbURI, mongooseConfig, (err) => {
    if (err) return console.log('this is that shit going', err);
    console.log(`Mongo is connected to '${dbURI}'`);
  });
  app.listen(port, () =>
    console.log(`Express app listening at http://localhost:${port}`)
  );
}

module.exports = app;
