const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PATH_AVATAR = path.join('/uploads/users/avatars');
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
    }, 
    avatar:{
      type : String
    },
    friendship:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }]
},
   {
   timestamps:true           //It keeps a log of creation and updation of objects here user objects
   }
);

//Now we will try to link multer to the PATH_AVATAR that is like making understand that where the location I want to save it.
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Path  : ',path.join(__dirname,'..',PATH_AVATAR));
    // console.log('Path  : ',path.join(__dirname));
    cb(null, path.join(__dirname,'..',PATH_AVATAR));
  },
  filename: function (req, file, cb){
    cb(null, file.fieldname + '-' + Date.now()+'.png');   //+'.png'
  }
});

//static 

userSchema.statics.uploadedAvatar =  multer({ storage: storage }).single('avatar'); //making multer understand that where is the destination and how to store file in the destination 
//exposing this path to outer fikes if needed so can be accessed as needed
userSchema.statics.path_avatar = PATH_AVATAR;


const User = mongoose.model('User',userSchema);

module.exports = User;