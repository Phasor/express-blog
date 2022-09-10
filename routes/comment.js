const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const passport = require('passport');


router.get('/', passport.authenticate('jwt', {session: false}) ,commentController.comment_get);
router.post('/', commentController.comment_create);

module.exports = router;