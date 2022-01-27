const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_Controller');
console.log('Router setup for User')
router.get('/profile',userController.userUpdated);

module.exports = router;