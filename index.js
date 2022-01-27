const express = require('express');
const port = 8000;
const app = express();
app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));


app.listen(port,function(err){
  if(err){
      console.log(`Error occured at ${port} and the error is : ${err}`);
  }
  console.log(`Server is up and running at port : ${port}`); 
});