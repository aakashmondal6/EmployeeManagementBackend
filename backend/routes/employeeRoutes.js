const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');
const validateBody = require('../middleware/addEmployee');
const rejectBody = require('../middleware/getEmployee');

router.get('/getAllEmployees',rejectBody ,controller.getAllEmployees).get('/filter', controller.getEmployeesByFilter);;
router.post('/',validateBody ,controller.addEmployee);
router.get('/logs', controller.getAuditLogs);
router.delete('/deleteEmployee', controller.deleteEmployee);
module.exports = router;