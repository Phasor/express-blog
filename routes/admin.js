const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('passport');
const isAdmin = require('../lib/utils').isAdmin;

// *** admin only routes ***
// get all admin accounts
router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, adminController.admin_get);
// create a new admin account
router.post('/', passport.authenticate('jwt', {session: false}), isAdmin, adminController.admin_create);

module.exports = router;