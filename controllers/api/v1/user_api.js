const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,resp){
   try{
     let user = await User.findOne({email : req.body.email});
     if(!user || user.password!=req.body.password ){
         return resp.status(422).json({
           message: 'Invalid Username or password'
         }); 
     }
     
    return resp.status(200).json({
      message : 'Token created successfully for the corresponding user',
      data:{
        token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '100000'})
      }
    }); 

   }catch(err){
     console.log('*******Error : ',err);
    return resp.status(500).json({
        message : 'There was some chaos there !!!'
    });
 }
}
