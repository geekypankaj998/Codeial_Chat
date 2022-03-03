const express = require('express');
const router = express.Router();

const postAPIController = require('../../../controllers/api/v1/postCont');
router.get('/',postAPIController.index);
router.get('/all',postAPIController.all);
router.delete('/destroy/:id',postAPIController.destroyPost);
module.exports = router;