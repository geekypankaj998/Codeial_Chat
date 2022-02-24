const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

const { redirect } = require('express/lib/response');

module.exports.savePost = async function(req,resp){

    try{
        let posts = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        let userC = await User.findById(req.user._id);
        if(req.xhr){
           req.flash('success','Post Saved'); 
           return resp.status(200).json({
             data : {
                 post : posts,
                 userCurr : userC.name  
                },
             message : 'Post Created successfully'
           });
        }
        req.flash('success','Post Saved');
        return resp.redirect('back');
    }catch(error){
        req.flash('error','Error occured',error);
        return redirect('back');
    } 
}
module.exports.destroyPost = async function(req,resp){
    //before destroying checking whether that key exist or not 
//   Post.findById(req.params.id,function(err,post){
//        if(err){console.log('Error occured during Deletion',err); return}
//     //.id helps to convert the ObjectId into String so we used it inplace ._id this is provide by moongose
//        if(post.user == req.user.id){
//            //Perfect Match
//            post.remove();
        
//     //Now need to remove the comments associated with the post
//     //Removing Comments with the post from Comment Model
//            Comment.deleteMany({post : req.params.id},function(err){
//               if(err){console.log('Error occured during Deleting Comments associated with the Post',err); return}
//            });
//            return resp.redirect('back');
//        }
//        else{
//            return resp.redirect('back'); //Need to show uSER A FLAG LIKE issue during loggin TO-DO
//        }
//   });  
// Now converting to async await
   try{
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){ 
        post.remove();
        let comm = await Comment.deleteMany({post : req.params.id});
        req.flash('success','Post and Associated Comments deleted');
        if(req.xhr){
           console.log('Inside AJAX Delete***'); 
           return resp.status(200).json({
             data : {
                 post_id : req.params.id
             },
             message : 'Deleted Successfully' 
           }); 
        }
        return resp.redirect('back');
    }
    else{
         
        return resp.redirect('back');
    }
    }
    catch(err){
        req.flash('error','Some error occured',err);
        return resp.redirect('back');
    }
   }
