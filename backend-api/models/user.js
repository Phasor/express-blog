const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false }
});

// Virtual for user's URL
UserSchema
    .virtual('url')
    .get(function() { // We don't use an arrow function as we'll need the this object
    return `/post/author/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);