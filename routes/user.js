var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user_get);
router.get('/:id', userController.user_getById);
router.post('/', userController.user_create_post);
router.delete('/:id', userController.user_delete);
router.put('/:id', userController.user_update);


module.exports = router;
