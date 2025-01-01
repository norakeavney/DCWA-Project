//Import required modules
const express = require('express'); 
const bodyParser = require('body-parser'); //Middleware 
const mysql = require('./DB/mySQL'); //Connects to MySQL database
const mongoose = require('./DB/Mongo'); //Connects to MongoDB database

//Initialize Express
const app = express();
const port = 3004; //Port 

//Middleware 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

//Import routes
const studentRoutes = require('./Routes/Students'); //Students page

//Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <ul>
      <li><a href="/students">Students</a></li>
      <li><a href="#">Grades</a></li>
      <li><a href="#">Lecturers</a></li>
    </ul>
  `);
});




//Use routes
app.use('/students', studentRoutes); //Student routes at /students

//Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
