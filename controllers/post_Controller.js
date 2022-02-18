const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.savePost = async function(req,resp){
      
    try{
        let posts = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        console.log('Success Saved');
        return resp.redirect('back');
    }catch(error){
        console.log('Error occured',error);
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
        return resp.redirect('back');
    }
    else{
        return resp.redirect('back');
    }
    }
    catch(err){
       console.log('error occured',err);
    }
   }
