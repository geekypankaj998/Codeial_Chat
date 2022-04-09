const express = require('express');
const passport = require('passport');
const router = express.Router();
const likeController = require('../controllers/like_Controller');

console.log('Router setup for Likes');

router.get('/toggle',passport.checkAuthenticated,likeController.toggleClick);

module.exports = router;