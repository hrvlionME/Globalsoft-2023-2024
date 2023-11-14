const mysql = require('mysql2');
require('dotenv').config({ path: './config/.env' });

const dbConn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log('Spojeno sa bazom');
});

module.exports = dbConn;
