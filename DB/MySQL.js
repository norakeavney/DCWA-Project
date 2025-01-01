//importing mysql package
const mysql = require('mysql2'); 

//Pool for connecting to mySQL DB
const pool = mysql.createPool({

  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proj2024mysql',
  waitForConnections: true, 
  connectionLimit: 10, 

});

//Export pool
module.exports = pool;
