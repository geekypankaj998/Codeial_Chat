const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comments_email_worker');
const queue = require('../config/kue');
module.exports.save = async function(req,resp){
  //check whether the post exist on which comment is made 
  // Post.findById(req.body.post,function(err,post){
  //         if(err){console.error(' Error occured during getting the post please check whther the post exist or not '); return;}
  //         //Post existed Now creating comment on the Post 
  //         Comment.create({
  //           content:req.body.content,
  //           user : req.user._id,
  //           post : req.body.post 
  //         },function(err,comment){
  //           if(err){console.error(' Error occured during getting the post please check whther the post exist or not '); return;}
              
  //         //The thing is comment is created but in the Post model each post contains array of comments associated with each post so that need to be updated in Post Model 
  //         // Updating Post table 
          //  post.comments.push(comment);
          //  post.save(); 
          //  return resp.redirect('back');
  //       });
  // })
  try{
    let post = await Post.findById(req.body.post);
   if(post){
   let comment = await Comment.create({
              content:req.body.content,
              user : req.user._id,
              post : req.body.post 
            });
            post.comments.push(comment);
            post.save();  
            console.log('Inside Comment Save');
            req.flash('success','Comment saved');
            comment = await comment.populate('user','name email');
            // commentMailer.newComment(comment);    //Earlier we used to do this way like initiating each job immediately
            // But now we would use here delayed job
            // for that we have defined the config and set up Kue
            // and defined the worker for this so will pass the task to thgat worker
            // Now calling the queue worker to process the job
            let job = queue.create('emails',comment).save(function(err){
              if(err){
                 console.log('Occur occured',err);
                 return;  
              }
              console.log('Jobb was triggered successfully : ',job.id);
            });
          if(req.xhr){
           
             return resp.status(200).json({
               comment : comment
              });  
          }  
            return resp.redirect('back');
      }
   else{
    return resp.redirect('back');
 }
}catch(err){
  req.flash('error',' Error occcured ',err);
  return resp.redirect('back');
}

}  

module.exports.destroy = async function(req,resp){
 //checking is the Comment existed or not 
//  Comment.findById(req.params.id,function(err,comment){
//     if(err){console.log('Error occured during deleting a comment',err); return}
    
//     //Comment existed now checking whether the request raise by the logged in user and that himselg has created the comment
//     let postID ;
//     if(req.user.id == comment.user){
//         postID = comment.post; 
//         comment.remove();   //comment removed 
       
//         // //Now removing this comment from Post Comment Array
//         // Post.findByIdAndUpdate(postID,{$pull : {comments : req.params.id}},function(err,post){
//         // //here post means that post which contains the deleted comment
//         // //$pull is used to fetch an array from the Document          
//         //    return resp.redirect('back');
//         // }); 
//         Post.findById(postID,function(err,post){
//                if(err){console.log('Error occured during Deleting Post for thr subsequent Comment',err); return}
//                console.log("Inside comment Delete @@@@@",post);
//                let indComm = post.comments.indexOf(req.params.id);
//                post.comments.splice(indComm,indComm+1);
//                post.save();
//                return resp.redirect('back');
//         });
//     }
//     else{
//       return resp.redirect('back');
//     }    
//  });
// Async Await Code
 let comment = await Comment.findById(req.params.id);
 if(comment){
  let postID ;
  if(req.user.id == comment.user){
      postID = comment.post; 
      comment.remove();
    let post = await Post.findById(postID);
    let indComm = post.comments.indexOf(req.params.id);
    post.comments.splice(indComm,indComm+1);

  // A smaller way to achieve the above task 
  // CHANGE :: destroy the associated likes for this comment
  // let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});    //practice
  //here postId is the _id of the post 
  

    //deleting all the likes associated with that comment in our Like Document/DB
    await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

    req.flash('success','Comment Delete');
    post.save();
    if(req.xhr){
       
       return resp.status(200).json({
         comment : comment._id
       });
    }
    return resp.redirect('back');
  }
  else{
    req.flash('error','Some error occured');
    return resp.redirect('back');
  }
 }
}