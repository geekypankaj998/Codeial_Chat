const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stategy');
const session = require('express-session');

app.use(express.urlencoded()); //Fetching content during Posting from Forms 
app.use(cookieParser()); //Provides functionality for Cookies
app.use(express.static('assets'));
app.use(expressLayouts);   //This needs to be done before routing as there we are using views

//this is used to extract styles and scripts for sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

//Session need to be used after setting views 
//This helps to make session info record (session cookie and is encripted)
app.use(session({
  name : 'codeial',
  //this helps in encription will set it whe will be deploying the code on server
  secret : 'blahsomething',
  saveUninitialized : false,
  resave:false,
  cookie:{
    maxAge : (1000*60*60)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(port,function(err){
  if(err){
      console.log(`Error occured at ${port} and the error is : ${err}`);
  }
  console.log(`Server is up and running at port : ${port}`); 
}); 