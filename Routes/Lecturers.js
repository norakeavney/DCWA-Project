const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//MongoDB Schema
const lecturerSchema = new mongoose.Schema({
  _id: String, 
  name: String,
  did: String 
}, { _id: false });

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

//GET - Display all lecturers
router.get('/', async (req, res) => {
  try {
    const lecturers = await Lecturer.find().sort({ _id: 1 }); //Alphabetical order

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Lecturers</title>
        <link rel="stylesheet" href="/css/styles.css"> 
        </head>
        <body>
        <h1>Lecturers</h1>
        <a href='/'>Home</a>
        <table border='1'>
            <tr>
            <th>Lecturer ID</th>
            <th>Name</th>
            <th>Department ID</th>
            <th>Action</th>
            </tr>
            ${lecturers.map(lecturer => `
            <tr>
                <td>${lecturer._id}</td>
                <td>${lecturer.name}</td>
                <td>${lecturer.did}</td>
                <td><a href='/lecturers/delete/${lecturer._id}' onclick="return confirm('Are you sure you want to delete this lecturer?');">Delete</a></td>
            </tr>`).join('')}
        </table>
        </body>
        </html>`;

    res.send(html);
  } catch (err) {
    console.error('Error loading lecturers:', err);
    res.status(500).send('Error loading lecturers');
  }
});

//DELETE - Delete a lecturer
router.get('/delete/:id', async (req, res) => {
    try {
      const lecturerId = req.params.id;
  
      //Check for associated modules in MySQL
      const [modules] = await mysql.query('SELECT * FROM module WHERE lecturer = ?', [lecturerId]);
  
      if (modules.length > 0) {
        //Lecturer has associated modules, show error message
        return res.send(`
          <h1>Error</h1>
          <p>Cannot delete lecturer ${lecturerId}. He/She has associated modules.</p>
          <a href='/lecturers'>Back</a>
        `);
      }
  
      //No associated modules
      const result = await Lecturer.findByIdAndDelete(lecturerId);
      res.redirect('/lecturers');
    } catch (err) {
      console.error('Error deleting lecturer:', err);
      res.status(500).send('Error deleting lecturer');
    }
  });

//Export
module.exports = router;
