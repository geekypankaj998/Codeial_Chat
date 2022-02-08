const User = require('../models/user'); 
const Post = require('../models/post'); 
const passport = require('passport');

module.exports.home = function(req,resp){

     //now mapping Post table with User  Table 
    console.log('Inside Home'+req.user);
    Post.find({user:req.user._id})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec(function(err,posts){
      if(err){console.log('Error occured during getting Posts of user',err); return}
      console.log(posts);

      return resp.render('home',{
       title:'Codeial Home',
       posts : posts
      });     
    });
  //  return resp.redirect('/home');
   
}

module.exports.profile = function(req,resp){
  return resp.render('user',{
    title: 'Codeial User',
    head : 'Inside User Profile',
    descriptn : 'This is user Profile Page'
  });
}
//action for Sign Up page
module.exports.signUp = function(req,resp){
  
  if(req.isAuthenticated()){  //the user existed already
    console.log('ALREADY Auth Done !!!');
    return resp.redirect('/users/profile');       
 }
  return resp.render('user_sign_up',{
    title: 'Codeial | Sign Up',
    head : 'Sign Up Page'
  }) 
}
//action for Sign In page
module.exports.signIn = function(req,resp){
 
  if(req.isAuthenticated()){  //the user existed already
    console.log('User Authentication Done Now Loading Home Page'); 
     return resp.redirect('/users/home');       
  }
  console.log('This is for the first time singn Up ');
  return resp.render('user_sign_in',{
    title: 'Codeial | Sign In',
    head : 'Sign In Page'  
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
  return resp.redirect('/users/signIn');  
}

module.exports.signOut = function(req,resp){
  req.logout(); 
  return resp.redirect('/');
}