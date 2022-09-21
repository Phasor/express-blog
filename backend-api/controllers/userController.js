const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const {body, validationResult} = require('express-validator');
const utils = require('../lib/utils');
const mongoose = require('mongoose');

exports.user_get = (req, res, next) => {
    User.find()
    .sort([['date', 'descending']])
    .exec((err, users) => {
        if (err) { return next(err); }
        res.json({users});
    });    
}

exports.user_getById = (req, res, next) => { 
    var userID = new mongoose.Types.ObjectId(req.params.id);
    User.findById(userID)
    .exec((err, user) => {
        if (err) {
            return res.json(err);
        }
        res.json({user, success: true});
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

exports.user_delete =  (req, res, next) => {
    // if Admin, delete user's posts and all comments on them
    // delete users comments from Comments collection
    // delete user from Users collection
    // delete comments made by the user on others' Posts in Posts collection

    const userID = req.params.id;

    const deleteUserPostsIfAdmin = async () => {
        try{
                const user = await User.findById(userID);
                if (user.admin) {
                    // find posts they have written
                    const userPosts = await Post.find({author: userID});
                    userPosts.forEach(async (post) => {
                        // delete comments on each post
                        console.log(`Inside forEach, this post is: ${post}`);
                        await Comment.deleteMany({post: post._id});
                        // delete post
                        await Post.findByIdAndDelete(post._id);
                    });
                }
            } catch (err) {
                console.log(err);
            }
    }

    const deleteUsersComments = async () => {
        try {
            await Comment.deleteMany({author: userID});
            console.log(`Deleted all comments by user ${userID} in Comments colletion`);
        } catch (err) {
            console.log(err);
            console.log("error deleting users comments in Comments");
        }
    }
    
    const deleteUserCommentsInOtherPosts = async () => {
        try {
            await Post.updateMany({"comments.author" : userID}, {$pull: {"comments": {author: userID}}});
            console.log(`Deleted their comments on other users posts`);
        } catch (err) {
            console.log(err);
            console.log("error deleting users comments in other peoples Posts");
        }
    }

    const deleteUser = async () => {
        try{
            await User.findByIdAndDelete(userID);
            console.log(`Deleted user ${userID}`);
        } catch (err) {
            console.log(err);
            console.log("error deleting user");
        }
    }

    try {
        deleteUserPostsIfAdmin();
        deleteUsersComments();
        deleteUserCommentsInOtherPosts();
        deleteUser();
        res.json({success: true, msg: `Ran all functions to delete user ${userID}`});
    } catch (err) {
        console.log(err);
        res.json({success: false, msg: `Failed to run all functions when deleting user ${userID}`});
    }
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
