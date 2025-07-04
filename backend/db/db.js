const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./employee.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    EmpId INTEGER PRIMARY KEY ,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    department TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS audit_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  emp_id TEXT,
  user TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  details TEXT
  )`);
});

module.exports = db;