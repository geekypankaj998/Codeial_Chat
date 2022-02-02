const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//authentication of user
passport.use(new LocalStrategy({
       usernameField : 'email'
    },
    function(email, password, done){
       User.findOne({email : email}, function(err,user){
             if(err){
               console.log(' There is an error in authentication : Try Again !!!'); 
             return done(err);
            }
             if(!user || user.password!=password){
                console.log('Invalid password]username') 
                return done(null,false); 
             }
              return done(null,user);
        });
    }
));


//serialize a user invovlves selecting a key that will be added in cookiw to identity an user in future(same session)
passport.serializeUser(function(user,done){
    console.log('Inside Serializer ',user);
    return done(null,user.id);
}); 

//deserialize a user means get the key from the cookie and get details for the user
passport.deserializeUser((function(id,done){
   User.findById(id,function(err,user){ //Finding whether this cookie exist or not (basically here cookie is user_id) 
     if(err){console.log('There is an error in authentication : Try Again !!!');
       return done(err);
    }
    return done(null,user);
   })
}));

module.exports = passport;