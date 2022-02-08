const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.save = function(req,resp){
  //check whether the post exist on which comment is made 
  Post.findById(req.body.post,function(err,post){
          if(err){console.error(' Error occured during getting the post please check whther the post exist or not '); return;}
          //Post existed Now creating comment on the Post 
          Comment.create({
            content:req.body.content,
            user : req.user._id,
            post : req.body.post 
          },function(err,comment){
            if(err){console.error(' Error occured during getting the post please check whther the post exist or not '); return;}
              
          //The thing is comment is created but in the Post model each post contains array of comments associated with each post so that need to be updated in Post Model 
          // Updating Post table 
           post.comments.push(comment);
           post.save(); 
           return resp.redirect('back');
        });
  })
}  