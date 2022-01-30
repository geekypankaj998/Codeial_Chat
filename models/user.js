const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    }
},
   {
   timestamp:true           //It keeps a log of creation and updation of objects here user objects
   }
);

const User = mongoose.model('User',userSchema);

module.exports = User;