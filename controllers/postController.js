const Post = require('../models/post');
const { parse } = require('json2csv');
const mongoose = require('mongoose');
const { body,validationResult } = require('express-validator'); // post data sanitization and validation

exports.post_get = (req, res, next) => {
    const posts = Post.find({}, (err, posts) => {
        if (err) {
            console.log(err);
            res.status(404).send("Sorry, can't find that!");
        } else {
            res.json(posts);
        }
    });
}

exports.post_template = (req, res, next) => {
    const fields = ['title', 'content', 'author', 'date', 'published'];
    const opts = { fields };
    const myData = '';

    try {
        const csv = parse(myData, opts);
        res.set("Content-Disposition", "attachment;filename=posts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } catch (err) {
        res.render('error', { error: err });
    }
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
        var authorID = mongoose.Types.ObjectId(req.author);

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


