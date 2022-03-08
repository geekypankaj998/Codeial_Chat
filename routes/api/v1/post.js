const express = require('express');
const router = express.Router();
const passport = require('passport');

const postAPIController = require('../../../controllers/api/v1/post_api');
router.get('/',postAPIController.index);
router.get('/all',postAPIController.all);
router.delete('/destroy/:id',passport.authenticate('jwt',{session : false}),postAPIController.destroyPost);
module.exports = router;