const Post = require('../../../models/post');
const User = require('../../../models/user');
const Comment =  require('../../../models/comment');
module.exports.index = function(req,resp){
  return resp.status(200).json({
      data : {
        info : 'Hi thi is an Test API for now!! :)'
      },
      message : 'Long live India and work for India'
  }); 
}

module.exports.all = async function(req,resp){
  
try{
  let posts = await Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  });

 

    return resp.json(200,{
      data :{
        post : posts,
        message: 'Success'
      }
    });
     
}catch(err){
  //  console.log('Error occured',err);
  return resp.json(500,{
    data : {
      post :[],
      message : 'Internal Server Error'
    } 
  });
}
}

module.exports.destroyPost = async function(req,resp){
 try{
  let post = await Post.findById(req.params.id);
    
      post.remove();
      let comm = await Comment.deleteMany({post : req.params.id});
    
      return resp.json(200,{
        data : 'Post and associated Comments Deleted',
        message : 'SuccessFull'
      });
  }

  catch(err){
     return resp.json(500,{
       data:{
         info:'Internal Error 500 Occured',
         message : 'There was some chaos there !!!'
       }
     });
  }

 }

