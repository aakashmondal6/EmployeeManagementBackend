const db=require('../db/db');

// exports.logAction=(userId,employeeId,action,beforeData=null,afterData=null)=>{
//     db.run(`INSERT INTO audit_logs (userId, employeeID, action, beforeData, afterData) VALUES (?, ?, ?, ?, ?)`,
//         [userId, employeeId, action,JSON.stringify(beforeData),JSON.stringify(afterData)],
//         function(err) {
//             if (err) {
//                 console.error('Error logging action:', err);
//             } else {
//                 console.log(`Action logged with ID: ${this.lastID}`);
//             }
//         }
//     )};
exports.logAction = (action, empId, user, details) => {
  db.run(
    'INSERT INTO audit_logs (action, emp_id, user, details) VALUES (?, ?, ?, ?)',
    [action, empId, user, details ? JSON.stringify(details) : null]
  )};