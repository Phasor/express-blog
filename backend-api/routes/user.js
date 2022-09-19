var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const isAdmin = require('../lib/utils').isAdmin;

// *** open routes ***
// create a new user account (non admin)
router.post('/', userController.user_create_post);

// *** admin only routes ***
// get user by id
router.get('/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_getById);
// get all users
router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_get);

// delete user
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_delete);
// update user
router.put('/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_update);

module.exports = router;
