const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isAdmin = require('../lib/utils').isAdmin;
const passport = require('passport');

// open route
router.get('/', postController.post_get);

// admin only routes
router.post('/', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_create_post,);
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_delete);
router.put('/:id', passport.authenticate('jwt', {session: false}), isAdmin, postController.post_update);

module.exports = router;