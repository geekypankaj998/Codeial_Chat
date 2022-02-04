const Post = require('../models/post');
const User = require('../models/user');


module.exports.savePost = function(req,resp){
    if(req.isAuthenticated()){
        console.log(req.user);
        Post.create({
            content : req.body.content,
            user : req.user._id
        },function(err,post){
           if(err){
               console.log('While Saving Post');
               return; 
           }
           console.log('Success Saved');
           return resp.redirect('back');
        })
    }
    else{
       console.log('Please signUp/SignIn');
       return resp.redirect('/users/signUp');
    }
}