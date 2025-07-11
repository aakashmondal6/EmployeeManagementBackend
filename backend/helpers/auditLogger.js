const db=require('../db/db');

// Function to log actions in the audit log
exports.logAction = (action, empId, user, details) => {
  db.run(
    'INSERT INTO audit_logs (action, emp_id, user, details) VALUES (?, ?, ?, ?)',
    [action, empId, user, details ? JSON.stringify(details) : null]
  );
};