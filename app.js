var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var appInsights=require("applicationinsights");
appInsights.setup("2252c797-e9d6-45f8-a940-8a0fad0e2da4");
appInsights.start();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter = require("./routes/courses")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/courses",courseRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  appInsights.defaultClient.trackException({exception:err});

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
