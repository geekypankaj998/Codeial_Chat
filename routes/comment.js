const express = require('express');
const router = express.Router();
const comment_Controller = require('../controllers/comment_Controller');
const passport = require('passport');

router.post('/save',passport.checkAuthenticated,comment_Controller.save);
router.get('/destroy/:id',passport.checkAuthenticated,comment_Controller.destroy);
module.exports = router;