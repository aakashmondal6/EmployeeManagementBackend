const express = require('express');
const bodyParser = require('express').json;
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(bodyParser());
app.use(logger);
app.use('/api/employees', employeeRoutes);
app.use(errorHandler);

module.exports = app;