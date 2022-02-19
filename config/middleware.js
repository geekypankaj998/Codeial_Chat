module.exports.setFlash =function(req,resp,next) {         //creating a middleware that will get req grom action controllers and set them into the resp in order to be visible in front-end
 resp.locals.flash = {
  success : req.flash('success'),
   error : req.flash('error')
 }
   next();
}