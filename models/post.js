const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content:{
     type : String,
     required:true 
  },
  //linking the user that created Post
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User' 
  },
  //linking all the comments with each post faster way otherwise fetching this info from the comments model 
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Comment' 
  }],
  like : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Like'
  }]    //this array contains info for all the likes on this post
},{
  timestamps:true
}
);

const Post = mongoose.model('Post',postSchema);
module.exports = Post;