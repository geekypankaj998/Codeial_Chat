const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service : 'gmail',
    host: 'smtp.gmail.com',   //this is a domain that google has made for dev to interact with it
    port: 587,
    secure: false, 
    auth: {
      user: 'developerpandey11', // generated  user
      pass: 'panduP@@11', // generated  password
    },
  });


let renderTemplate = (data,relativePath)=>{   //relativePath from where this function is called
  let mailHTML;    //content for HTML page  
  ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),
    data,           //It is basically the context that we pass to ejs
    function(err,template){
      if(err){ console.log('Error occured',err); return;}
      mailHTML = template
      console.log('Inside Config File for Nodemail RenderFile ',data);
      return;
    }
    )
}

module.exports = {
  transporter : transporter,
  renderTemplate : renderTemplate
}
