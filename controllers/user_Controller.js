module.exports.user = function(req,resp){
  resp.end('<h1>This is User Profile ::smile </h1>');
}
module.exports.userUpdated = function(req,resp){
  resp.render('user',{
    title: 'Codeial',
    head : 'Inside User Profile',
    descriptn : 'This is user Profile Page'   
  });
}
