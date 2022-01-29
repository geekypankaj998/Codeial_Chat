module.exports.showPost = function(req,resp){
  resp.render('post',{
      title: 'Codeial Posts',
      head : 'Inside Post Section / History',
      descriptn : 'Here you could see all your actions in past'  
  });

}