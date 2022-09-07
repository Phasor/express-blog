const User = require('../models/user');

exports.user_create_post = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err) => {
        if (err) { 
            return res.render('/user', { error: err });
        }
         res.render('/user');
    });
}

exports.user_create_get = (req, res, next) => {
    res.render('signup');
}