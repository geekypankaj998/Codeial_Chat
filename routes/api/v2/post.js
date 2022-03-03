const express = require('express');
const router = express.Router();

const postAPIController = require('../../../controllers/api/v2/postUpdateContr');
router.get('/',postAPIController.index);
module.exports = router;