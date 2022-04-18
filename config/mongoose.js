const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',function(err){
  console.log('Error Occured while setting DB',err.message);
  return;
});

db.once('open',function(){
  console.log('Database SetUp Done');
  return;
});
module.exports = db;