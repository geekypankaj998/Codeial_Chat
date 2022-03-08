const User = require('../models/user'); 
const Post = require('../models/post'); 
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const paths = require('path');

module.exports.home = async function(req,resp){

     //now mapping Post table with User  Table 
    console.log('Inside Home'+req.user);
    try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    });

    let users = await User.find({});

    return resp.render('home',{
      title:'Codeial Home',
      posts : posts,
      userL : users
     });
    }catch(err){
      console.log('Error Occured',err);
    }  

}

module.exports.profile = function(req,resp){
  User.findById(req.params.id,function(err,user){
    return resp.render('user',{
      title: 'Codeial User',
      head : 'Inside User Profile',
      descriptn : 'This is user Profile Page',
      userCurrPro : user
    });
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
 
  return resp.render('user_sign_in',{
    title: 'Codeial | Sign In',
    head : 'Sign In Page'  
  }) 
}
//Create User Page
module.exports.create = function(req,resp){
    if(req.body.password!=req.body.confirm_password){
      console.log('Both password dont match please enter again!!!');
      req.flash('info','Both password dont match please enter again!!!');
      return resp.redirect('back');
    }
    // Now will see whther a user (Model entity exist with these signatures)
    User.findOne({email : req.body.email},function(err,user){
      if(err){console.log('Error occured during Checking User'); 
      return 
    }

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
        req.flash('error','Email/User Already Exist'); 
        return resp.redirect('back');  
      }
    })
}

module.exports.createSession = function(req,resp){
  console.log('Inside User Create Session @@@!!!!');  
  req.flash('success','Logged In Successfully :)');
  console.log('Sign In success#####');
  return resp.redirect('/users/home');  
}

module.exports.signOut = function(req,resp){
  req.logout(); 
  req.flash('success','Logged Out :)');
  return resp.redirect('/');
}
module.exports.update = async function(req,resp){
  
  // console.log()
  // if(req.user.password!=req.body.oldpassword){ //Ideally If I removed password from user object
  //   console.log('Password mismatch');          // while sending to the front - end so if I removed or not  
  //   req.flash('error','Old Passwords Mismatch');  //added this prop then this prop code block fails Okay
  //   return resp.redirect('back');
  // }

  // if(req.body._password!=req.body.confirm_password){
  //     req.flash('info','New Password and Confirm Password Mismatch');  
  //   return resp.redirect('back');
  // }

  // whether the old password was correct  
  // User.findById(req.params.id,function(err,user){
  //    if(err){console.log('Error occured during veryfying indentity of user',err); return ;} 

  //    console.log(user.name+" "+user.email);
  //   //  verifying old password and currInp Password
  //   // Updating Prev Info
  //   user.name = req.body.nwName;
  //   user.email = req.body.nwEmail;
  //   user.password = req.body.confirm_password;
  //   user.save();
  //   return resp.redirect('back');
  // }); This was my logic 

  //Other way
  // User.findByIdAndUpdate(req.params.id,{name: req.body.nwName , email : req.body.nwEmail, password : req.body.confirm_password},function(err,user){
  //   return resp.redirect('back');
  // });

  //If wanted then we send Unauthorised access remark a;so
  //  return resp.status(401).send('Unauthorised');

  
  // Now Changing the previous code with Async Await
  if(req.user.id == req.params.id){
    try{
      let userCurr = await User.findById(req.params.id); 


      //Here I can't directly fetch forms Input as it is a multipart state so to achieve that I will use 
      // uploadedAvatar prop of User Schema
      User.uploadedAvatar(req,resp,function(err){
        if(err){
           console.log('Error ',err);
           return;
        }
        //Most Important need to check whther this user old password and stored in DB and that he entered matched or not 
        if(req.body.oldpassword != userCurr.password){
           req.flash('warning','Unauthorised Access , Please Be Cautious');
           return resp.redirect('back');   
        }
        if(req.body._password != req.body.confirm_password){
          req.flash('warning',' Password Mismatch Try to make Both Same ');
           return resp.redirect('back');  
        }

        userCurr.email = req.body.email;
        userCurr.password = req.body.confirm_password;
        userCurr.save();

        if(req.file){ // If while placing the update call if there has been a file uploaded regarding update

          //Check whether do we have previously saved the profile earlier so as to save the space it would take as we need to remove the previous image space and this
          if(userCurr.avatar){
              // already present 
              //I need to remove this image from the upload folder 
              let pathF = paths.join(__dirname+'/..'+userCurr.avatar); 
              
              fs.unlinkSync(pathF);
          }
          userCurr.avatar = User.path_avatar + '/' + req.file.filename;
          console.log('Upload done');
          return resp.redirect('back');
        }
        // If no file is sent only info update request is made
        else{
           return resp.redirect('back'); 
        }
      });
    }catch(err){
       console.log(' Error Occured ',err);
       return;
    }
  }
  else{
    req.flash('error','Invalid Try Please check your Credentials');
    return resp.redirect('back');
  }
   
}

