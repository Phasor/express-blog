const Post = require('../models/post');
const mongoose = require('mongoose');

exports.post_get = (req, res, next) => {
    res.render('post');
}

exports.post_create_post = (req, res, next) => {

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
            return res.render('post', { error: err });
        }
         res.render('post');
    });
}


