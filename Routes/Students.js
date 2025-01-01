const express = require('express'); 
const router = express.Router(); 
const mysql = require('../DB/mySQL'); //MySQL connection

//Students page route
router.get('/', (req, res) => {
  //Fetch all students sorted by ID
  const query = 'SELECT * FROM student ORDER BY sid';

  mysql.query(query, (err, results) => {
    if (err) {
      console.error(err); //Log errors
      return res.status(500).send('Database query failed'); //Error response
    }

    //Build HTML response - table structure
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

    //Loop through results & build table rows
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

    response += '</table>'; //Close table
    res.send(response); 
  });
});

//Update student page (GET)
router.get('/edit/:sid', (req, res) => {
  const sid = req.params.sid; //Get ID from URL
  const query = 'SELECT * FROM student WHERE sid = ?';

  mysql.query(query, [sid], (err, results) => {
    if (err || results.length === 0) {
      console.error(err);
      return res.status(500).send('Student not found');
    }

    const student = results[0];
    let response = `
      <h1>Update Student</h1>
      <a href="/">Home</a><br>
      <form method="POST" action="/students/edit/${student.sid}">
        <label>Student ID</label><br>
        <input type="text" name="sid" value="${student.sid}" readonly><br>
        <label>Name</label><br>
        <input type="text" name="name" value="${student.name}"><br>
        <label>Age</label><br>
        <input type="number" name="age" value="${student.age}"><br>
        <button type="submit">Update</button>
      </form>
    `;
    res.send(response);
  });
});

//Update student page (POST)
router.post('/edit/:sid', (req, res) => {
  const sid = req.params.sid;
  const { name, age } = req.body;

  //Validation checks
  if (name.length < 2 || age < 18) {
    return res.send('<h1>Error</h1><p>Name must be at least 2 characters and age must be 18 or older.</p><a href="/">Home</a>');
  }

  const query = 'UPDATE student SET name = ?, age = ? WHERE sid = ?';

  mysql.query(query, [name, age, sid], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to update student');
    }
    res.redirect('/students'); //Redirect back to students page
  });
});

module.exports = router; // Export router for use in server.js
