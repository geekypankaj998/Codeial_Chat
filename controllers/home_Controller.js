module.exports.home = function(req,resp){
    resp.end('<h3>This is codeial controller</h3>');
}

module.exports.homeUpdate = function(req,resp){
    resp.render('home',{
        title:'Codeial Home',
        descriptn : 'One stop solution tech talks'
    });
}