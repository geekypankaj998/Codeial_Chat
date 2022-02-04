const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_Controller');
console.log('Router setup for Post');
router.post('/save',postController.savePost);
module.exports = router;