//Importing mongoose
const mongoose = require('mongoose');

//Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/proj2024MongoDB', {

  useNewUrlParser: true,
  useUnifiedTopology: true,

});

//Export
module.exports = mongoose;
