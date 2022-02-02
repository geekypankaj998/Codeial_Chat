const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_Controller');
console.log('Router setup for User');
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.get('/profile',userController.profile);
router.post('/create',userController.create);
//here we need middleware during calling createsession passport middleware
router.post('/create-session',passport.authenticate(
  'local',
  {failureRedirect : '/users/signIn'},
),userController.createSession);

module.exports = router;
