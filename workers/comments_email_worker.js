// const queue = require('../config/kue');

// const commentsMailer = require('../mailers/comments_mailer');
// // First arg is the name of the worker
// // Sec is the 
// queue.process('emails',function(job,done){
//    //job consist of the work that this worker will do 
//    //here it focusses on mailer task and the passing the data i.e. the comment with suitable info
//    console.log('Email Worker is sending a email',job.data); 

//   //  now this worker will handle the mailer 
//   commentsMailer.newComment(job.data);
   
//   done();
// });