module.exports.index = function(req,resp){
  return resp.status(200).json({
      data : {
        ans : 'This is the solution for this',
        message : 'Success' 
      }
  });
}