const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/', templateController.get_template);
router.post('/', templateController.post_template);

module.exports = router;
