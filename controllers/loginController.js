const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../lib/utils');

exports.login_post = (req, res, next) => {
    User.findOne({ username: req.body.username})
    .then((user) => {

        if(!user) {
            return res.status(401).json({ success: false, mge: 'User not found' });
        }

        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
        if(isValid) {
            // valid user, give them a jwt so they don't need to login all the time
            const tokenObject = utils.issueJWT(user);

            res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
        } else{
            res.status(401).json({ success: false, msg: 'You entered the wrong password' });
        }
    })
    .catch((err) => {
        next(err);
    });
};
