const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
var opts = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : 'codeial'
}


passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    User.findById( jwtPayload._id , function(err, user) {
        if (err) {
            console.log('Error Occured ',err);
            done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
module.exports = passport;