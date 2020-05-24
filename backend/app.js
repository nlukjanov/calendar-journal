import 'core-js/stable';
import 'regenerator-runtime/runtime';
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const router = require('./config/router');

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/api',router);

app.get('/', (req, res) => res.send('Hello World'));

module.exports = app;
