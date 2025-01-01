//Importing mongoose
const mongoose = require('mongoose');

//Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/proj2024MongoDB', {

  useNewUrlParser: true,
  useUnifiedTopology: true,

});


//Log connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//Export
module.exports = mongoose;
