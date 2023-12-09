var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


var usersRouter = require('./routes/users');
var registrationRouter = require('./routes/registration-route');
var loginRouter = require('./routes/login-route');
var dashboardRouter = require('./routes/dashboard-route');
var logoutRouter = require('./routes/logout-route');
var logoutRouter = require('./routes/logout-route');
var showRouter=require('./routes/show');
var dtcmasterRouter=require('./routes/dtc_master-route');
var submasterRouter=require('./routes/sub_master-route');
var feedermasterRouter=require('./routes/feeder_master-route');
var feedermeterreadingRouter=require('./routes/feeder_meter_reading-route');
var dtcmeterreadingRouter=require('./routes/dtc_meter_reading-route');
var dtcenergyauditRouter=require('./routes/dtc_energy_audit-route');
var dropRouter=require('./routes/drop-route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/',showRouter);
app.use('/',dtcmasterRouter);
app.use('/',submasterRouter);
app.use('/',feedermasterRouter); 
app.use('/',feedermeterreadingRouter);
app.use('/',dtcmeterreadingRouter);
app.use('/', logoutRouter);
app.use('/', dtcenergyauditRouter);
app.use('/', dropRouter);

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
