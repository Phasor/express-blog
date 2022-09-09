const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.post_get);
router.post('/', postController.post_create_post);
router.delete('/:id', postController.post_delete);
router.put('/:id', postController.post_update);
router.get('/template', postController.post_template);



module.exports = router;