const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleClick = async (req, resp) => {
  try {
    //Link will be like : /like/toggle/?id=abcdef&type=Post/Comment
    let deleteLike = false; //this helps to track whether that button was previously clicked or not
    let likeable;
    console.log("Inside Like functionality");
    if(req.xhr){
    // console.log('Req obj  info : ',req.query);
    if (req.query.type == "Post") {
      //Like was on a post
      likeable = await Post.findById(req.query.id).populate("like");
    } else {
      likeable = await Comment.findById(req.query.id).populate("like");
    }
    // likeable is simply setting up to the value/type it is whether Post/Comment\

    console.log("Inside likeable OBJECT $$$: ", likeable);
    //checking whther that like existed previously or not
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModal: req.query.type,
      user: req.user._id,
    });

    // If a like already exists so it should be decreased and reset
    if (existingLike) {
      //  removal Like
      likeable.like.pull(existingLike._id); //removing from Post/Comment Array that particular id val from like array
      
      console.log('Earlier Liked Removed');

      likeable.save(); //as on a whole it is a update op so I need to save the overall changes
      existingLike.remove(); //removing the Like from Like Schema
      deleteLike = true;
    } else {
      //createLike as it is being liked for the first time by the curr user
      console.log('New Liked Created For Action');
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModal: req.query.type,
      }); //entry in the Like DB
      console.log('New Like created with : ',newLike);
      likeable.like.push(newLike._id);
      likeable.save();
    }

    return resp.status(200).json({
      data:{
        deleted: deleteLike,
      }
    });
    }

  } catch (err) {
    console.log("Error occured during Like Handling ", err);
    return;
  }
};
