const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname,'../production_logs');  //Creating the place where to store the logs

 fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);   //If alreday created file then reuse it otherwise create a new file

const accessLogStream = rfs.createStream('access.log',{
   interval : '1d',
   path: logDirectory
});

const development = {
  asset_path : '/assets',
  session_cookie_key : 'blahsomething',
  db : 'codeialDB',
  smtp: {
    service : 'gmail',
    host: 'smtp.gmail.com',   //this is a domain that google has made for dev to interact with it
    port: 587,
    secure: false, 
    auth: {
      user: 'developerpandey11', // generated  user
      pass: 'panduP@@11', // generated  password
    }
  },
  systemEmail : 'developerpandey11',
  google_clientID : '215189006290-eb2l49cstdj7lg7s9fqc1umqk4nrb6e5.apps.googleusercontent.com',
  google_clientSecret : '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',
  google_callbackURL : 'http://localhost:8000/users/auth/google/callback',
  jwt_secret : 'codeial',
  morgan:{
    mode: 'dev',
    options: {stream : accessLogStream}
  }
}

const production = {
  name:'production',
  asset_path : process.env.CODEIAL_ASSET_PATH,  // done
  session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,   // done
  db : process.env.CODEIAL_DB, //done
  smtp: {
    service : 'gmail',
    host: 'smtp.gmail.com',   //this is a domain that google has made for dev to interact with it
    port: 587,
    secure: false, 
    auth: {
      user: process.env.CODEIAL_SYSTEM_EMAIL, // generated  user
      pass: process.env.CODEIAL_PASSWORD,    // generated  password
    }
  },
  systemEmail : process.env.CODEIAL_SYSTEM_EMAIL,  //done
  google_clientID : process.env.CODEIAL_GOOGLE_CLIENT_ID, //done
  google_clientSecret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET, //done
  google_callbackURL : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret : process.env.CODEIAL_JWT_SECRET, //done
  morgan:{
    mode: 'combined',
    options: {stream : accessLogStream}
  }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;