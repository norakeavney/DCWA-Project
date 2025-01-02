const express = require('express'); 
const router = express.Router(); 
const mysql = require('../DB/mySQL'); 

//Grades page route
router.get('/', (req, res) => {
    const query = `
    SELECT s.name AS student, IFNULL(m.name, 'No Module') AS module, IFNULL(g.grade, '') AS grade
    FROM student s
    LEFT JOIN grade g ON s.sid = g.sid
    LEFT JOIN module m ON g.mid = m.mid
    ORDER BY s.name ASC, g.grade ASC`;

  mysql.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query failed');
    }

    let response = `
      <h1>Grades</h1>
      <a href="/">Home</a>
      <table border="1">
        <tr>
          <th>Student</th>
          <th>Module</th>
          <th>Grade</th>
        </tr>
    `;

    results.forEach(row => {
      response += `
        <tr>
          <td>${row.student}</td>
          <td>${row.module || 'No Module'}</td>
          <td>${row.grade || ''}</td>
        </tr>
      `;
    });

    response += '</table>';
    res.send(response);
  });
});

//Export
module.exports = router; 
