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

exports.admin_create = (req, res, next) => {
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
            const jwt = utils.issueJWT(user);
            res.json({ success: true, user:user, token: jwt.token, expiresIn: jwt.expires });
        })
        .catch(err => {
            res.json({ success: false, msg: 'Failed to create user' });
        });
}

