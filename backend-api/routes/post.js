const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isAdmin = require('../lib/utils').isAdmin;
const passport = require('passport');


// get all published posts- open route
router.get('/', postController.post_get);
// get ALL posts, published or unpublished - admin only
router.get('/all', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_get_admin);
// get a single post - open route
router.get('/:id', postController.post_get_single);

// *** other admin only routes ***
// create a new post
router.post('/', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_create_post);
// publish post
router.put('/:id/publish', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_publish);
// unpublish a post
router.put('/:id/unpublish', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_unpublish);
// delete post
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_delete);
// update post
router.put('/:id', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_update);


module.exports = router;

