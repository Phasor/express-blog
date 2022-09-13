const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../lib/utils');
const {body, validationResult} = require('express-validator');

exports.login_post = [
    // Validate and sanitize fields.
    body('username', 'Email must be specified.').trim().isLength({ min: 1 }).isEmail().withMessage("Email is not valid.").escape(),
    body('password', 'Password must not be empty.').trim().isAlphanumeric().isLength({ min: 4 }).withMessage("Password must be at least 4 characters long.").escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are input errors.
            res.json({errors: errors.array()});
            return;
        }

        // input is valid, find user in db
        User.findOne({ username: req.body.username})
        .then((user) => {
            if(!user) {
                return res.status(401).json({ success: false, mge: 'User not found' });
            }
            // check if supplied password is correct
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if(isValid) {
                // valid user, issue a JWT
                const tokenObject = utils.issueJWT(user);
                res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
            } else{ // wrong password
                res.status(401).json({ success: false, msg: 'You entered the wrong password' });
            }
        })
        .catch((err) => {
            next(err);
        });
    }
]
