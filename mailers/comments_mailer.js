const nodeMailer = require('../config/nodemailer');
const env = require('../config/environment');

exports.newComment = (comment)=>{
    console.log('Inside Comment Mailer',comment);
    let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comments.ejs'); 
    console.log('The EJS contentt : ',htmlString);
    nodeMailer.transporter.sendMail({
    from: `${env.systemEmail}`, // sender address
    to: comment.user.email, // list of receivers
    subject: "Account Activity", // Subject line
    html: htmlString // html body
  },
  (err,info)=>{
    if(err){
         console.log(' Error Occured during Mailer Calling ',err);
         return; 
    }

    console.log('Success Mailer : ',info);
    return;
   }
  );
}