let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let bodyParser = require('body-parser');

let expressSession = require('express-session');
let mongoStore = require('connect-mongo')(expressSession);
let mongoose = require('mongoose');
let mongodUrl = 'mongodb://localhost/myMovies';
mongoose.connect(mongodUrl);
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
//
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'myMovie',
  store: new mongoStore({
    url: mongodUrl,
    collection: 'sessions'
  })
}));
app.use('/', indexRouter);

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
