var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var index = require('./routes/index');
var user = require('./routes/user');
var list = require('./routes/list');
var admin = require('./routes/admin');
var signIn = require('./routes/signIn');

var port = process.env.PORT || 3000;

var app = express();

mongoose.connect('mongodb://127.0.0.1/note',{useMongoClient:true});
mongoose.connection.on('connected', function () {
    console.log('数据库连接成功');
});
// var defUser = new mongoose.model('user', { name: String,password:String });
// var kitty = new defUser({ name: 'admin',password:"123" });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });
mongoose.connection.on('error',function (err) {
    console.log('数据库连接出现错误，错误为：'+ err);
});

app.use(express.static(path.join(__dirname, 'bower_components')));

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', signIn);
app.use('/user', user);
app.use('/list', list);//list notes.
app.use('/admin', admin);//write note.


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

//create server
app.listen(port);
console.log('Server started on port ' + port);

module.exports = app;
