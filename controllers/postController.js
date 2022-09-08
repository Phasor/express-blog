const Post = require('../models/post');
const { parse } = require('json2csv');
const mongoose = require('mongoose');

exports.post_get = (req, res, next) => {
    res.render('post');
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


