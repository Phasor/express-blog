const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const utils = require('../lib/utils');

exports.admin_get = (req, res, next) => {
    User.find({admin: true})
    .sort([['date', 'descending']])
    .exec((err, users) => {
        if (err) { return res.json(err); }
        res.json({users});
    });    
}

exports.admin_create = [ 
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
        } else {
            // data is valid, create and save new admin account
            const saltHash = utils.genPassword(req.body.password);
            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newUser = new User({
                username: req.body.username,
                hash: hash,
                salt: salt,
                admin: true
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
    }   
]

