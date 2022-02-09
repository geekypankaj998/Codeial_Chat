const Post = require('../models/post');
module.exports.homeUpdate = function(req,resp){

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        } 
    })
    .exec(function(err,posts){
        if(err){console.log('Error occured during getting Posts of user'); return;}
        
        return resp.render('home',{
         title:'Codeial Home',
         posts : posts
        });
    });
}