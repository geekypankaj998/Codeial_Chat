const express = require('express');
const port = 8000;
const app = express();
require('./config/view-helper.js')(app);
const env = require('./config/environment');
const logger = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const Friend = require('./models/friend');  //If I didn't included this modal here then it throws error that schema is not registered because User is included here & in it , it references to the friend modal so need to include this also
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');


const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Server setup done---->>>');


app.use(logger(env.morgan.interval,env.morgan.options));
app.use(express.urlencoded()); //Fetching content during Posting from Forms 
app.use(cookieParser()); //Provides functionality for Cookies
app.use(express.static(path.join(__dirname,env.asset_path)));
app.use(expressLayouts);   //This needs to be done before routing as there we are using views

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header('Origin'));
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use('/uploads',express.static(__dirname+'/uploads'));
//this is used to extract styles and scripts for sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

//Session need to be used after setting views 
//This helps to make session info record (session cookie and is encripted)
app.use(session({
  name : 'codeial',
  //this helps in encryption will set it whe will be deploying the code on server
  secret : env.session_cookie_key,
  saveUninitialized : false,          //when the user not logged in or identity is not established don't keep any info in cookie anything about him 
  resave:false,                       // that means rewriting the cookie again and again 
  cookie:{
    maxAge : (1000*60*60)
   },
  store : new MongoStore(
    {
    mongooseConnection : db,
    autoRemove : 'disabled'
    },function(err){
     console.log(err || 'setUp Mongo Session Cookie done');
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);

app.use(flash());     //Now flash can access session to store messages
app.use(customMware.setFlash); //Requring custom Middleware for adding req to resp flash obj 

app.use('/',require('./routes'));

console.log(env.name);
app.listen(port,function(err){
  if(err){
      console.log(`Error occured at ${port} and the error is : ${err}`);
  }
  console.log(`Server is up and running at port : ${port}`); 
}); 

