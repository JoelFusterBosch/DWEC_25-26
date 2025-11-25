require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: mysql,
  user: "root",
  password: "root",
  database: "users",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos la versión que soporta Promesas
module.exports = pool.promise();
