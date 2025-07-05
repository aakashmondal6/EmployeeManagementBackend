const express = require('express');
const bodyParser = require('express').json;
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE']
})); // Enable CORS for all routes
app.use(bodyParser());
app.use(logger);
app.use('/api/employees', employeeRoutes);
app.use(errorHandler);

module.exports = app;