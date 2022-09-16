const Comment = require('../models/comment');
const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


exports.comment_get = (req, res, next) => {
    Comment.find()
    .sort([['date', 'ascending']])
    .exec((err, comments) => {
        if (err) { return res.json(err); }
        res.json({comments});
    });    
}

exports.comment_create = [
    // Validate fields.
    body('content', 'Content must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('post', 'Post must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Send back error messages.
            res.json({errors: errors.array()});
            return;
        }
        else {
            // Data is valid.
            // turn strings into MongoDI ObjectIds
            const authorID = new mongoose.Types.ObjectId(req.body.author);
            const postID = new mongoose.Types.ObjectId(req.body.post);

            const comment = new Comment(
                {
                    content: req.body.content,
                    post: postID,
                    author: authorID,
                    date: Date.now()
                }
            );
            // save comment in comment collection
            comment.save(function (err) {
                if (err) { 
                    return res.json(err); 
                }
            })
    
            // save comment in post collection
            Post.findOneAndUpdate(
                {_id:req.body.post},  
                {$push: {comments: comment}},
                {new: true},
                function (err, post) {
                    if (err) { 
                        return res.json(err); 
                    }
                    res.json({message: "Comment created",post:post, success: true});
                }
            )
        }
    }
]

exports.comment_deleteById = (req, res, next) => {

    // delete comment from Comment collection
    Comment.findByIdAndRemove(req.params.id, (err, comment) => {
        if (err) { 
            return res.json(err); 
        }
        console.log("Comment deleted from Comment collection");
    })
    // delete comment from Post collection
    Post.findOne({"comments._id": req.params.id}, (err, post) => {
        if (err) { 
            return res.json(err); 
        }
        post.comments.id(req.params.id).remove();
        post.save((err, post) => {
            if (err) { 
                return res.json(err); 
            }
            console.log("Comment deleted from Post collection");
            res.json({message: "Comment deleted.",post:post, success: true});
        })
    })
}
