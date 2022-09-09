const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_get);
router.post('/', commentController.comment_create);

module.exports = router;