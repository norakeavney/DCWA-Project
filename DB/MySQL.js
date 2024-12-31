//importing mysql package
const mysql = require('mysql2'); 

//Pool for connecting to mySQL DB
const pool = mysql.createPool({

  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proj2024mysql' 

});

//Export pool
module.exports = pool.promise();
