const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
console.log('Router set up for / ');

router.get('/',homeController.homeUpdate);
router.use('/users',require('./users'));
router.use('/post',require('./post'));

module.exports = router;