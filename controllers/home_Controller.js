const Post = require('../models/post');
const User = require('../models/user');
module.exports.homeUpdate = function(req,resp){
    console.log('Inside Home'+req.user);

    Post.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec(function(err,posts){
      if(err){console.log('Error occured during getting Posts of user',err); return}

      User.find({},function(err,users){
        if(err){console.log('Error occured during fetching Users info',err); return}
  
        return resp.render('home',{
          title:'Codeial Home',
          posts : posts,
          userL : users
         });  
      })       
    }); 
}