const User = require('../models/user'); 
const passport = require('passport');

module.exports.user = function(req,resp){
  resp.end('<h1>This is User Profile ::smile </h1>');
}
module.exports.profile = function(req,resp){
  resp.render('user',{
    title: 'Codeial User',
    head : 'Inside User Profile',
    descriptn : 'This is user Profile Page'   
  });
}
//action for Sign Up page
module.exports.signUp = function(req,resp){
  resp.render('user_sign_up',{
    title: 'Codeial | Singn Up',
    head : 'Sign Up Page',
    descriptn : 'This is Sign Up Page for First Time User'   
  }) 
}
//action for Sign In page
module.exports.signIn = function(req,resp){
  return resp.render('user_sign_in',{
    title: 'Codeial | Sign In',
    head : 'Sign In Page',
    descriptn : 'Welcome Back Comarade !!'   
  }) 
}
//Create User Page
module.exports.create = function(req,resp){
    if(req.body.password!=req.body.confirm_password){
      console.log('Both password dont match please enter again!!!');
      return resp.redirect('back');
    }
    // Now will see whther a user (Model entity exist with these signatures)
    User.findOne({email : req.body.email},function(err,user){
      if(err){console.log('Error occured during Checking User'); return }

      if(!user){  //no user found ,null so it means User need to be created and then made to land on Sign In Page
          
        User.create({                 //User created Succesfully
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
          }, function(err,userN){
              if(err){console.log('Error Occured During Creation : ',err.message); return} //Error Occured During Creation then sending to SignUp Page 
              console.log('Inside Create Function');
              return resp.redirect('/users/signIn');
          });  
      }
      else{  //If it comes here it means user Present with same credentials earlier so try with diff credentials
        return resp.redirect('back');  
      }
    })
}

module.exports.createSession = function(req,resp){
  console.log('Inside User Create Session');  
  return resp.redirect('/users/profile');  
}