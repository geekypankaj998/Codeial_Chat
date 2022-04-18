const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');
const User = require('../models/user');

//request for signing via Google
passport.use(new googleStrategy({
    clientID : env.google_clientID,
    clientSecret :env.google_clientSecret,
    callbackURL : env.google_callbackURL
  },
   function(accessToken,refreshToken,profile,done){   //accessTokens are used to define/provide various functionality to the service like getting mapInfo,timezone etc  
   //This accessToken is provided by google 
   //If this accessoken expires then refreshToken creates new accessTokens again
   //Here profile contains user Info 

   //find the user
   User.findOne({email : profile.emails[0].value}).exec(function(err,user){ //here we did emails as emails is an array like in a case a user has many accounts so for that we will take the first
      if(err){console.log('Error occured in Google Strategy Passport'); return}
      
      console.log(profile);

      //If user found ?
      if(user){
       //Is user found then set req.user (basically initiate passport for this like it used to be in localStrategy and session set up work that works under the hood) 
        return done(null,user); 
      }
      else{
        // Creating the user with the emailId provided during google signUp 
        User.create({
          name : profile.displayName,
          email : profile.emails[0].value,
          password : crypto.randomBytes(20).toString('hex')
        },function(err,user){
          if(err){console.log('Error occured in Google Strategy Passport'); return}
          // As user is cretaed then set req.user (basically initiate passport for this like it used to be in localStrategy and session set up work that works under the hood) 
          return done(null,user);
        }) 
      }
   });
   } 
 ));

 module.exports = passport;