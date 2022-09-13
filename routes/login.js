const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// *** open routes ***
router.post('/', loginController.login_post);

module.exports = router;