const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isAdmin = require('../lib/utils').isAdmin;
const passport = require('passport');

// *** open routes ***
// get all posts
router.get('/', postController.post_get);
// get a single post
router.get('/:id', postController.post_get_single);

// *** admin only routes ***
// create a new post
router.post('/', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_create_post);
// get post by id
router.post('/:id/publish', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_publish);
// delete post
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_delete);
// update post
router.put('/:id', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_update);

module.exports = router;

