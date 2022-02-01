const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_Controller');
console.log('Router setup for User');
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.get('/profile',userController.profile);
router.post('/create',userController.create);
module.exports = router;