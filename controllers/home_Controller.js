const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
module.exports.homeUpdate = async function(req,resp){
    console.log('Inside Home'+req.user);
  try{
    // console.log('<<<<<<<>>>>>>>>>>> Inside Home controller');
    let posts = await Post.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }                     //removed Likes Path as it overwrite the user Path\
     
    }).populate('like');


    
    let users = await User.find({});
    
      return resp.render('home',{
        title:'Codeial Home',
        posts : posts,
        userL : users
       });
       
  }catch(err){
     console.log('Error occured',err);
  }
}