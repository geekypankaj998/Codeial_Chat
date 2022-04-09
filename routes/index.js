const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
console.log('Router set up for / ');

router.get('/',homeController.homeUpdate);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/like',require('./like'));
router.use('/api',require('./api')); //Adding route for API query as the main Index should have info pre hand while transfering.

module.exports = router;