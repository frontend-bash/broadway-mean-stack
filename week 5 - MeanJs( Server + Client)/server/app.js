var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
///mongodb://localhost/database
var url="mongodb://localhost:27017/broadwayDb";
//mongodb://username:password@hostname:port/database

mongoose.connect(url);
var connection=mongoose.connection;

connection.on('connected', function(){
  console.log('Mongoose connected to ' + url);
});

connection.on("open",function () {
  console.log("Connection open on  " + url)
});

connection.on('error', function() {
  console.log("Sorry, there is no mongo db server running.")
});

process.on('SIGINT', function(){
  connection.close(function(){
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/books', books);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
