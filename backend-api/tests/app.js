const cors = require('cors');
var express = require('express');
var path = require('path');
const passport = require('passport');
var logger = require('morgan');
require('dotenv').config();

// import routes
var userRouter = require('../routes/user');
const postRouter = require('../routes/post');
const commentRouter = require('../routes/comment');
const adminRouter = require('../routes/admin');
const loginRouter = require('../routes/login');

var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./db');

// Pass the global passport object into the configuration function
require('../config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// setup middleware
app.use(logger('dev'));
app.use(express.json()); // Instead of using body-parser middleware
app.use(express.urlencoded({ extended: true })); // Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder
app.use(cors()); // allows our front end application to make HTTP requests to Express application

// use our routes
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);

module.exports = app;
