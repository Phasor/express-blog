const Post = require('../models/post');
const mongoose = require('mongoose');
const { body,validationResult } = require('express-validator'); // post data sanitization and validation

exports.post_get = (req, res, next) => {
    Post.find()
    .sort([['date', 'ascending']])
    .populate('author')
    .exec((err, posts) => {
        if (err) { 
            return res.json(err); 
        }
        res.json(posts);
    });
}

exports.post_create_post = [
    // validate the data
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('content', 'Content must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),

    // process the request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors.
            res.json({errors: errors.array()});
        }

        // post data is valid, save Post
        // author is a string, but we need to convert it to an ObjectId
        var authorID = new mongoose.Types.ObjectId(req.body.author);

        // new posts are default unpublished
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: authorID,
            date: Date.now(),
            published: false
        });
    
        post.save((err) => {
            if (err) {
                res.json({ error: err });
            }
            res.json({post: post});
        });
    }
];

exports.post_delete = (req, res, next) => {
    Post.findByIdAndRemove(req.params.id, (err, post) => {
        if (err) {
            res.json({ error: err });
        }
        res.json({message: "Deleted the following post", post: post});
    });
}

exports.post_update = [
    // assume all fields are passed in. Will pull in old Post that can be edited in WYSIWYG editor 
    
    // validate the data
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('content', 'Content must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('date', 'Date must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('published', 'Published must not be empty.').trim().isLength({ min: 1 }).escape(),

    // process the request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors.
            res.json({errors: errors.array()});
        }

        // post data is valid, save Post
        // author is a string, but we need to convert it to an ObjectId
        var authorID = new mongoose.Types.ObjectId(req.body.author);

        Post.findByIdAndUpdate(req.params.id, 
            {
                title: req.body.title,
                content: req.body.content,
                author: authorID,
                date: req.body.date,
                published: req.body.published
            }, 
            (err, post) => {
                if (err) {
                    res.json({ error: err });
                }
                res.json({message: "updated the following post (this is the pre change version)",post: post});
            }
        );
    }
];

exports.post_publish = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, 
        {
            published: true
        }, 
        {new: true}, // return the updated post
        (err, post) => {
            if (err) {
                res.json({ error: err });
            }
            res.json({message: "Published post",post: post});
        }
    );
}


  
            