const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeialDB');

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