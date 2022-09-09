var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const templateRouter = require('./routes/template');
const commentRouter = require('./routes/comment');
const adminRouter = require('./routes/admin');

var app = express();

// setup mongoose
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI; 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// setup middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use our routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/template', templateRouter);
app.use('/comment', commentRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
