const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.post_get);
router.get('/template', postController.post_template);
router.post('/', postController.post_create_post);


module.exports = router;