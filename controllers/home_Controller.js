const Post = require('../models/post');
const User = require('../models/user');
module.exports.homeUpdate = async function(req,resp){
    console.log('Inside Home'+req.user);
  try{
    let posts = await Post.find({})
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
     console.log('Error occured',err);
  }
}