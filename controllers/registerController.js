const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../lib/utils');

exports.register_post = (req, res) => {
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
                const jwt = utils.issueJWT(user);
                res.json({ success: true, user:user, token: jwt.token, expiresIn: jwt.expires });
            })
            .catch(err => {
                res.json({ success: false, msg: 'Failed to create user' });
            });
};