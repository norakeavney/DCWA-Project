const express = require('express'); 
const router = express.Router(); 
const mysql = require('../DB/mySQL'); 

//Grades page route
router.get('/', (req, res) => {

 const sortBy = req.query.sortBy || 's.name'; //Sort field (name, module, or grade)
 const sortOrder = req.query.sortOrder || 'ASC'; //Sort order (ASC or DESC)

 const query = `
   SELECT s.name AS student, IFNULL(m.name, 'No Module') AS module, IFNULL(g.grade, '') AS grade
   FROM student s
   LEFT JOIN grade g ON s.sid = g.sid
   LEFT JOIN module m ON g.mid = m.mid
   ORDER BY ${sortBy} ${sortOrder}`;

 mysql.query(query, (err, results) => {
   if (err) {
     console.error(err); //Log any errors
     return res.status(500).send('Database query failed'); // Send error response
   }

   let response = `
   <html>
    <head>
      <title>Grades</title>
      <link rel="stylesheet" href="/css/styles.css"> 
    </head>
   <body>
     <h1>Grades</h1>
     <a href="/">Home</a>
     <div class="sort-options">
       <b>Sort By:</b>
       <a href="/grades?sortBy=s.name&sortOrder=ASC">Student Name (A-Z)</a> |
       <a href="/grades?sortBy=s.name&sortOrder=DESC">Student Name (Z-A)</a> |
       <a href="/grades?sortBy=m.name&sortOrder=ASC">Module (A-Z)</a> |
       <a href="/grades?sortBy=m.name&sortOrder=DESC">Module (Z-A)</a> |
       <a href="/grades?sortBy=g.grade&sortOrder=ASC">Grade (Low-High)</a> |
       <a href="/grades?sortBy=g.grade&sortOrder=DESC">Grade (High-Low)</a>
     </div>
     <table>
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
       <td>${row.module}</td>
       <td>${row.grade}</td>
     </tr>
   `;
 });

    response += '</table>';
    res.send(response);
  });
});

//Export
module.exports = router; 
