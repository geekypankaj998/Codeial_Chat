const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');

app.use(express.static('assets'));
app.use(expressLayouts);   //This needs to be done before routing as there we are using views

app.use(express.urlencoded()); //Fetching content during Posting from Forms 
app.use(cookieParser()); //Provides functionality for Cookies

//this is used to extract styles and scripts for sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
  if(err){
      console.log(`Error occured at ${port} and the error is : ${err}`);
  }
  console.log(`Server is up and running at port : ${port}`); 
}); 