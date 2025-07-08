const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');
const validateBody = require('../middleware/addEmployee');
const rejectBody = require('../middleware/getEmployee');
const  {authorizeRoles}  = require('../middleware/auth');

router.get('/getAllEmployees',rejectBody ,controller.getAllEmployees);
router.get('/filter', controller.getEmployeesByFilter);
router.post('/AddEmployee',validateBody ,controller.addEmployee);
router.get('/logs', controller.getAuditLogs);
router.delete('/deleteEmployee', authorizeRoles('admin'), controller.deleteEmployee);
module.exports = router;
