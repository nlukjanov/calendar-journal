import 'core-js/stable';
import 'regenerator-runtime/runtime';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const router = require('./config/router');

app.use(bodyParser.json());
app.use(logger);

app.use(router);

app.get('/', (req, res) => res.send('Hello World'));

module.exports = app;
