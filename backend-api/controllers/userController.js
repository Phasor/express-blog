const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const utils = require('../lib/utils');

exports.user_get = (req, res, next) => {
    User.find()
    .sort([['date', 'descending']])
    .exec((err, users) => {
        if (err) { return next(err); }
        res.json({users});
    });    
}

exports.user_getById = (req, res, next) => {    
    User.findById(req.params.id)
    .exec((err, user) => {
        if (err) { 
            return res.json(err); 
        }
        res.json({user});
    });
}

exports.user_create_post = [
    // validate and sanitize fields
    body('username', 'Email must be specified.').trim().isLength({ min: 1 }).isEmail().withMessage("Email is not valid.").escape(),
    body('password', 'Password must not be empty.').trim().isAlphanumeric().isLength({ min: 4 }).withMessage("Password must be at least 4 characters long.").escape(),

    // process request after validation and sanitization
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // there are input errors
            res.json({errors: errors.array()});
            return;
        }

        // create and save new user account
        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt,
            admin: false
        });

        newUser.save()
            .then(user => {
                // issue user with JWT
                const jwt = utils.issueJWT(user);
                res.json({ success: true, user:user, token: jwt.token, expiresIn: jwt.expires });
            })
            .catch(err => {
                res.json({ success: false, msg: 'Failed to create user' });
            });
    }
]

exports.user_delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) { 
            return res.json(err); 
        }
        res.json({message: "Deleted this user", user: user});
    });
}

exports.user_update = [
    // assume all fields are passed in. Will pull in old User that can be edited in WYSIWYG editor
    body('username', 'Email must be specified.').trim().isLength({ min: 1 }).isEmail().withMessage("Email is not valid.").escape(),
    body('password', 'Password must not be empty.').trim().isAlphanumeric().isLength({ min: 4 }).withMessage("Password must be at least 4 characters long.").escape(),
    body('admin', 'Admin must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. 
            res.json({errors: errors.array()});
            return;
        }
        else {
            // Data is valid. Update the salt and hash
            const saltHash = utils.genPassword(req.body.password);
            const salt = saltHash.salt;
            const hash = saltHash.hash;

            // update user in db
           User.findByIdAndUpdate(req.params.id, 
            {
                username: req.body.username,
                hash: hash,
                salt: salt,
                admin: req.body.admin
            },
            {new: true}, // return the updated User
            (err, user) => {
                if (err) { 
                    return res.json(err); 
                }
                res.json({message: "Updated user.", user: user});
            }); 
        }
    }
]
