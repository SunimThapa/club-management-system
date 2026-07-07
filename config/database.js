
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          
  password: '',          
  database: 'club_management_system', 
  waitForConnections: true,
  connectionLimit: 10,   
  queueLimit: 0
}, console.log('Connected to the MySQL database'));

const db = pool.promise();

module.exports = db;