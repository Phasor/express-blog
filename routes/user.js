var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const isAdmin = require('../lib/utils').isAdmin;

// open routes
router.post('/', userController.user_create_post);

// admin only routes
router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_get);
router.get('/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_delete);
router.put('/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.user_update);

module.exports = router;
