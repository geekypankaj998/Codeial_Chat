const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//authentication of user
passport.use(new LocalStrategy({
       usernameField : 'email',      //the field that will be unique in my model here email
       passReqToCallback : true
    },
    function(req,email, password, done){   // function that authenticates user credentials
       User.findOne({email : email}, function(err,user){
             if(err){
               req.flash('error',' There is an error in authentication : Try Again !!!',err); 
               return done(err);
            }
             if(!user || user.password!=password){
                req.flash('error','Invalid password/username');
                return done(null,false); 
             }
              return done(null,user);
        });
    }
));


//serialize a user invovlves selecting a key that will be added in cookie to identity an user in future(same session)
passport.serializeUser(function(user,done){
    console.log('Inside Serializer ',user);
    return done(null,user.id);
}); 

//deserialize a user means get the key from the cookie and get details for the user
passport.deserializeUser((function(id,done){
   User.findById(id,function(err,user){ //Finding whether this cookie exist or not (basically here cookie is user_id) 

     console.log('Inside deserializer');
      
     if(err){console.log('There is an error in authentication : Try Again !!!');
       return done(err);
    }
    return done(null,user);
   })
}));

//checking whether a user has been set with session cookie or not 
passport.checkAuthenticated = function(req,resp,next){
 
   if(req.isAuthenticated()){
      return next();  //move to controller
   }
   console.log('Checked but not returned!!!');
   return resp.redirect('/users/signIn'); //Not yet setup
}

//want to display content on views
passport.setAuthenticated = function(req,resp,next){  
    if(req.isAuthenticated()){ //req.user contains curent signed user cookie so just passing this to the local views
      resp.locals.user = req.user;
    }
    return next();
}

module.exports = passport;