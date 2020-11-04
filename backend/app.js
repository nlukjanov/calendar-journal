const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const router = require('./config/router');
const handleError = require('./lib/errorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/api', router);
app.use(handleError);

app.get('/', (req, res) => res.send('Hello World'));

module.exports = app;
