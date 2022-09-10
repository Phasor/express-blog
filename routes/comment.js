const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const passport = require('passport');
const isAdmin = require('../lib/utils').isAdmin;


// must be admin to see all comments
router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, commentController.comment_get);
// must be logged in to create a comment
router.post('/', passport.authenticate('jwt', {session: false}) ,commentController.comment_create);

module.exports = router;