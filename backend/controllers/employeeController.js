const db = require('../db/db');
const { logAction } = require('../helpers/auditLogger');

// Get all employees method which fetches all employees from the database
// and returns them as a JSON response.
exports.getAllEmployees = async(req, res, next) => {
  await db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Get employees by filter method which fetches employees based on the provided
// query parameters (city, department, EmpId). It constructs a dynamic SQL query
// based on the provided filters and returns the matching employees as a JSON response.
exports.getEmployeesByFilter = async(req, res, next) => {
  const { city, department, EmpId } = req.query;
  let query = 'SELECT * FROM employees';
  let conditions = [];
  let params = [];

  if (EmpId && EmpId.trim() !== '') {
    conditions.push('TRIM(LOWER(EmpId)) = ?');
    params.push(EmpId.trim().toLowerCase());
  }
  if (city && city.trim() !== '') {
    conditions.push('TRIM(LOWER(city)) = ?');
    params.push(city.trim().toLowerCase());
  }
  if (department && department.trim() !== '') {
    conditions.push('TRIM(LOWER(department)) = ?');
    params.push(department.trim().toLowerCase());
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
console.log(query,params);
  await db.all(query, params, (err, rows) => {
    if (err) return next(err);
    // If no employees found, return a message
    if (rows.length === 0)
      {
        //console.log('No employees found');
      return res.status(200).json({ message: "No Employee found with this data" });
      } 
 
    res.json(EmpId ? rows[0] : rows);
  });
};

// Add employee method which adds a new employee to the database.
// It checks if all mandatory fields are provided, validates if the employee already exists,
// and then inserts the new employee into the database. It also logs the action in the audit log if the employee is successfully added.
exports.addEmployee = async(req, res, next) => {
  const { EmpId, name, city, department } = req.body;
  // Check for mandatory fields in the request
  if (!EmpId || !name || !city || !department) {
    return res.status(400).json({ message: "All fields are required" });
  }
// Check if employee already exists
  db.get('SELECT EmpId FROM employees WHERE EmpId = ?', [EmpId], (err, row) => {
    if (err) return next(err);
    if (row) {
      return res.status(409).json({ message: "Employee with this ID already exists" });
    }

    const query = 'INSERT INTO employees (EmpId, name, city, department) VALUES (?, ?, ?, ?)';
    db.run(query, [EmpId, name, city, department], function (err) {
      if (err) return next(err);
      // Log the action in the audit log based on the user role
     const userRole = req.user?.role || 'system'; 
      console.log('userRole:', userRole);
      logAction('ADD_EMPLOYEE', EmpId, userRole, { name, city, department });
      res.status(201).json({ id: EmpId, message: "Employee details have been created successfully" });
    });
  });
};

//deleting an employee from the database
exports.deleteEmployee=async(req, res, next) => {
  const { EmpId } = req.query;

  // Check if EmpId is provided in the query parameters
  if (!EmpId) {
    return res.status(400).json({ message: "EmpId is required" });
  }


  db.get('SELECT EmpId FROM employees WHERE EmpId = ?', [EmpId], (err, row) => {
    if (err) return next(err);
    // Check if employee exists or not
    if (!row) {
      return res.status(404).json({ message: "Employee not found" });
    } 
    else {
      // If exists, delete employee from the database
      db.run('DELETE FROM employees WHERE EmpId = ?', [EmpId], function (err) {
        if (err) return next(err);
        // Log the action in the audit log as only admin can delete employee
        logAction('DELETE_EMPLOYEE', EmpId, 'admin', { EmpId });
        res.status(200).json({ message: `EmployeeID ${EmpId} details have been deleted successfully` });
      });
    }
  });
};

// Get audit logs method which fetches all audit logs from the database
// and returns them as a JSON response. It orders the logs by timestamp in descending order.
exports.getAuditLogs = async (req, res, next) => {
  await db.all('SELECT * FROM audit_logs ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};