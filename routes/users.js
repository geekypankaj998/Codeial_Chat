const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_Controller');
console.log('Router setup for User');
router.get('/home',passport.checkAuthenticated,userController.home);
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.get('/profile/:id',passport.checkAuthenticated,userController.profile);
router.post('/create',userController.create);
router.get('/signOut',userController.signOut);
router.post('/update/:id',passport.checkAuthenticated,userController.update);
//here we need middleware during calling createsession passport middleware

router.post('/create-session',passport.authenticate(
  'local',
  {failureRedirect : '/users/signIn'}),userController.createSession);
// router.post('/create-session',passport.checkAuthenticated,userController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));  //This works when SignIn/SignUp with Goggle is clicked
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect : '/users/signIn'}),userController.createSession); //This functn works when after verification user is returned from Google

module.exports = router;
