const User = require('../models/user');
const {body, validationResult} = require('express-validator');

exports.admin_get = (req, res, next) => {
    User.find({admin: true})
    .sort([['date', 'descending']])
    .exec((err, users) => {
        if (err) { return res.json(err); }
        res.json({users});
    });    
}

exports.admin_create = [
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
            var user = new User(
                {
                    email: req.body.email,
                    password: req.body.password,
                    admin: true 
                });
            user.save(function (err) {
                if (err) { return res.json(err); }
                // Successful 
                res.json({message: "New admin created", user: user});
            });
        }
    }
]

