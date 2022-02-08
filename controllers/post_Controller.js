const Post = require('../models/post');


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
