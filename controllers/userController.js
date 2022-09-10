const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs'); // hash passwords

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
    body('username', 'Email must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password must not be empty.').trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.json({errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Create an User object with escaped and trimmed data.


            bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
                // if err, reload page with error message
                if (error) {
                    console.log(error);
                    res.status(400).json({ error: error });
                }

                const user = new User(
                    {
                        username: req.body.username,
                        password: hashedPassword,
                        admin: false 
                    }
                );
                
                user.save(function (err) {
                    if (err) { 
                        return res.json(err); 
                    }
                    // Successful 
                    res.json({message: "New user created", user: user});
                });
            })
        }
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
    body('username', 'Email must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('admin', 'Admin must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.json({errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
           User.findByIdAndUpdate(req.params.id, 
            {
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin
            },
            (err, user) => {
                if (err) { 
                    return res.json(err); 
                }
                res.json({message: "Updated this user", user: user});
            }); 
        }
    }
]
