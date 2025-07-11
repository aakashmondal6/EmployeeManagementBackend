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

//Use of CORS to allow cross-origin requests
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser());
app.use(logger);
app.use(errorHandler);
app.use('/api/auth', authRoutes);
// The authenticateJWT middleware is used to protect the employee routes, ensuring that only authenticated users can access them.
// The employeeRoutes handle all employee-related operations such as adding, deleting, and filtering employees.
// The authenticateJWT middleware checks for a valid JWT token in the request headers.
// If the token is valid, it allows access to the employee routes; otherwise, it returns a 401 Unauthorized response.
app.use('/api/employees', authenticateJWT, employeeRoutes);


module.exports = app;