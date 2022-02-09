const express = require('express');
const passport = require('passport');
const router = express.Router();
const postController = require('../controllers/post_Controller');
console.log('Router setup for Post');
router.post('/save',passport.checkAuthenticated,postController.savePost);
router.get('/destroy/:id',passport.checkAuthenticated,postController.destroyPost);
module.exports = router;