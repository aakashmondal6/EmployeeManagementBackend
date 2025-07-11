const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');
const validateBody = require('../middleware/addEmployee');
const rejectBody = require('../middleware/getEmployee');
const  {authorizeRoles}  = require('../middleware/auth');

// These routes handle employee management functionality.
// They include getting all employees, filtering employees by various criteria, adding a new employee,
// getting audit logs, and deleting an employee. The routes are protected by authentication and authorization middleware
router.get('/getAllEmployees',rejectBody ,controller.getAllEmployees);
router.get('/filter', controller.getEmployeesByFilter);
router.post('/AddEmployee',validateBody ,controller.addEmployee);
router.get('/logs', controller.getAuditLogs);
// The deleteEmployee route allows an admin to delete an employee by their EmpId.
router.delete('/deleteEmployee', authorizeRoles('admin'), controller.deleteEmployee);
module.exports = router;
