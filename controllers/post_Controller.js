const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.savePost = function(req,resp){
 
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
        });
}
module.exports.destroyPost = function(req,resp){
    //before destroying checking whether that key exist or not 
  Post.findById(req.params.id,function(err,post){
       if(err){console.log('Error occured during Deletion',err); return}
    //.id helps to convert the ObjectId into String so we used it inplace ._id this is provide by moongose
       if(post.user == req.user.id){
           //Perfect Match
           post.remove();
        
    //Now need to remove the comments associated with the post
    //Removing Comments with the post from Comment Model
           Comment.deleteMany({post : req.params.id},function(err){
              if(err){console.log('Error occured during Deleting Comments associated with the Post',err); return}
           });
           return resp.redirect('back');
       }
       else{
           return resp.redirect('back'); //Need to show uSER A FLAG LIKE issue during loggin TO-DO
       }
  });  

}