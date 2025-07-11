const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./employee.db');

db.serialize(() => {
  //create employee tables if they do not exist
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    EmpId INTEGER PRIMARY KEY ,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    department TEXT NOT NULL
  )`);
  //create audit_logs table if it does not exist
  db.run(`CREATE TABLE IF NOT EXISTS audit_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  emp_id TEXT,
  user TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  details TEXT
  )`);
 //create users table if it does not exist
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);
});

module.exports = db;