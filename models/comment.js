const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
     content:{
       type : String,
       required : true 
     },
    //  including info about the user that created the comment
     user : {
       type: mongoose.Schema.Types.ObjectId,
       ref : 'User'
     },
    //  including the info about the post under which this comment was maid 
     post :{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Post'
     } 
},{
  timestamps : true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment ; 