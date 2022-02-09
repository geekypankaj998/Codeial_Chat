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

module.exports.destroy = function(req,resp){
 //checking is the Comment existed or not 
 Comment.findById(req.params.id,function(err,comment){
    if(err){console.log('Error occured during deleting a comment',err); return}
    
    //Comment existed now checking whether the request raise by the logged in user and that himselg has created the comment
    let postID ;
    if(req.user.id == comment.user){
        postID = comment.post; 
        comment.remove();   //comment removed 
       
        //Now removing this comment from Post Comment Array
        Post.findByIdAndUpdate(postID,{$pull : {comments : req.params.id}},function(err,post){
        //here post means that post which contains the deleted comment
        //$pull is used to fetch an array from the Document          
           return resp.redirect('back');
        }) 
    }
    else{
      return resp.redirect('back');
    }    
 });

}