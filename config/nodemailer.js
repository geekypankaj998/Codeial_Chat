const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(env.smtp);


let renderTemplate = (data,relativePath)=>{   //relativePath from where this function is called
  let mailHTML;    //content for HTML page  
  ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),
    data,           //It is basically the context that we pass to ejs
    function(err,template){
      if(err){ console.log('Error occured',err); return;}
      mailHTML = template
      console.log('Inside Config File for Nodemail RenderFile ',data);
     
    }
    );
    return mailHTML;
    
}

module.exports = {
  transporter : transporter,
  renderTemplate : renderTemplate
}
