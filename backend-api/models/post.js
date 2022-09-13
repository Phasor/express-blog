const mongoose = require('mongoose');
const Comment = require('./comment').schema;

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, required: true, default: false },
    comments: [Comment]
});

// Virtual for post's URL
PostSchema
    .virtual('url')
    .get(function() { // We don't use an arrow function as we'll need the this object
    return `/post/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);