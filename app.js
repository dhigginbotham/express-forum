
/**
 * Module dependencies.
 */

var express = require('express'),
  controllers = require('./controllers'),
  user = require('./controllers/user'),
  http = require('http'),
  path = require('path');

var app = express();

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
  app.use(express.session());
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

app.get('/', controllers.index);
app.get('/users/view', user.list);
app.post('/users', user.add);
app.get('/register', user.register);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
