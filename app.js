
/**
 * Module dependencies.
 */
var express = require('./server').express;
var app = require('./server').app;
var server = require('./server').server;
var io = require('./server').io;

var db = require('./models/db'), 
  pass = require('./conf/pass'),
  passport = require('passport');

var controllers = require('./controllers'),
  user_routes = require('./controllers/user'),
  path = require('path');

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mmm');
  app.set('layout', 'layout');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Fee-fi-fo-fum'));
  app.use(express.session({ secret: 'Fee-fi-fo-fum' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

app.configure('development', function () {
  app.set('db uri', 'localhost/xfm');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//add in passport routes

app.get('/', controllers.index);

// User pages
app.get('/account', pass.ensureAuthenticated, user_routes.account);
app.get('/login', user_routes.getlogin);
app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
app.post('/login', user_routes.postlogin);
app.get('/logout', user_routes.logout);

//user routes
app.get('/register', user_routes.register);
app.post('/users', user_routes.add);

server.listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
