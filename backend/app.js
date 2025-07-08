const express = require('express');
const bodyParser = require('express').json;
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const  {authenticateJWT}  = require('./middleware/auth');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE']
}));
app.use(bodyParser());
app.use(logger);
app.use(errorHandler);
app.use('/api/auth', authRoutes);
app.use('/api/employees', authenticateJWT, employeeRoutes);


module.exports = app;