const express = require('express'); // Import Express framework
const router = express.Router(); // Create router instance
const mysql = require('../DB/mySQL'); // Import MySQL connection

// Students page route
router.get('/', (req, res) => {
  // Query to fetch all students sorted by ID
  const query = 'SELECT * FROM student ORDER BY sid';

  // Execute query using callback
  mysql.query(query, (err, results) => {
    if (err) {
      console.error(err); // Log any errors
      return res.status(500).send('Database query failed'); // Send error response
    }

    // Build HTML response - table structure
    let response = `
      <h1>Students</h1>
      <a href="/students/add">Add Student</a><br>
      <a href="/">Home</a>
      <table border="1">
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
    `;

    // Loop through results and build table rows
    results.forEach(student => {
      response += `
        <tr>
          <td>${student.sid}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td><a href='/students/edit/${student.sid}'>Update</a></td>
        </tr>
      `;
    });

    response += '</table>'; // Close the table
    res.send(response); // Send the response
  });
});

module.exports = router; // Export router for use in server.js
