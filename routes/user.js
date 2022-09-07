var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.user_create_post);
router.get('/', userController.user_create_get);

module.exports = router;
