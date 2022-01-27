const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
console.log('Router set up');

router.get('/',homeController.home);
router.use('/users',require('./users'));

module.exports = router;