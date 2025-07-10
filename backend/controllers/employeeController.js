const db = require('../db/db');
const { logAction } = require('../helpers/auditLogger');

exports.getAllEmployees = async(req, res, next) => {
  await db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

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
    if (rows.length === 0) return res.status(200).json({ message: "Employee not found" });
    res.json(EmpId ? rows[0] : rows);
  });
};

exports.addEmployee = async(req, res, next) => {
  const { EmpId, name, city, department } = req.body;
  
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
     const userRole = req.user?.role || 'system'; 
      console.log('userRole:', userRole);
      logAction('ADD_EMPLOYEE', EmpId, userRole, { name, city, department });
      res.status(201).json({ id: EmpId, message: "Employee details have been created successfully" });
    });
  });
};
//deleting an employee
exports.deleteEmployee=async(req, res, next) => {
  const { EmpId } = req.query;
  if (!EmpId) {
    return res.status(400).json({ message: "EmpId is required" });
  }
  // Check if employee exists
  db.get('SELECT EmpId FROM employees WHERE EmpId = ?', [EmpId], (err, row) => {
    if (err) return next(err);
    if (!row) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      // If exists, delete employee
      db.run('DELETE FROM employees WHERE EmpId = ?', [EmpId], function (err) {
        if (err) return next(err);
        // Log the action
        logAction('DELETE_EMPLOYEE', EmpId, 'admin', { EmpId });
        res.status(200).json({ message: `EmployeeID ${EmpId} details have been deleted successfully` });
      });
    }
  });
};
exports.getAuditLogs = async (req, res, next) => {
  await db.all('SELECT * FROM audit_logs ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};