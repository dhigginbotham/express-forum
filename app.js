
/**
 * Module dependencies.
 */
var express = require('./conf/server').express;
var app = require('./conf/server').app;
var server = require('./conf/server').server;
var io = require('./conf/server').io;

var db = require('./models/db'), 
  pass = require('./conf/pass'),
  passport = require('passport');

var controllers = require('./controllers'),
  user_routes = require('./controllers/user'),
  crud_routes = require('./controllers/crud'),
  topic_routes = require('./controllers/topics'),
  path = require('path');

app.configure(function () {
  app.set('port', process.env.PORT);
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
  app.set('port', 3001)
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', controllers.index);

app.get('/a', pass.ensureAuthenticated, user_routes.get.modify);
app.post('/a/update', pass.ensureAuthenticated, user_routes.post.modify);

app.get('/a/view/all', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.get.view);

app.get('/a/view/:usr', pass.ensureAuthenticated, user_routes.get.viewUser);

app.get('/f/create', pass.ensureAuthenticated, crud_routes.get.create);
app.post('/f/create', pass.ensureAuthenticated, crud_routes.post.create);

app.get('/f/:fid/all', pass.ensureAuthenticated, topic_routes.get.view);

app.get('/t/view', pass.ensureAuthenticated, topic_routes.get.view);

app.get('/f/view', pass.ensureAuthenticated, pass.ensureAdmin(), crud_routes.get.view);

app.get('/f/update', pass.ensureAuthenticated, pass.ensureAdmin(), crud_routes.get.modify);
app.post('/f/update', pass.ensureAuthenticated, pass.ensureAdmin(), crud_routes.post.modify);

app.get('/make-admin', pass.ensureAuthenticated, user_routes.get.makeAdmin); //remove this asap

app.get('/logout', user_routes.logout);

app.get('/login', user_routes.getlogin);
app.post('/login', user_routes.postlogin);

app.get('/register', user_routes.register);
app.post('/register', user_routes.add);

server.listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
