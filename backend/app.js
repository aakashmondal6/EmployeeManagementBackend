require('dotenv').config()
const express = require('express');
const bodyParser = require('express').json;
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const  {authenticateJWT}  = require('./middleware/auth');


const app = express();

.use(cors({
  origin: 'apphttp://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser());
app.use(logger);
app.use(errorHandler);
app.use('/api/auth', authRoutes);
app.use('/api/employees', authenticateJWT, employeeRoutes);


module.exports = app;