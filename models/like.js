const mongoose  = require('mongoose');

const likeSchema = new mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId
   },
  //  this helps to define that this like object is referring to Post or Comment
   likeable:{
     type :  mongoose.Schema.Types.ObjectId,
     required : true,
     refPath : 'onModal'
   },
   //here defining the options for referring 
   onModal:{
      type:String,
      required:true,
      enum : ['Post','Comment']
   }
},
{
  timestamps :true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;