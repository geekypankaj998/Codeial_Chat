const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_Controller');
console.log('Router setup for Post')
router.get('/all',postController.showPost);

module.exports = router;