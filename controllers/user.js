
/*
  define models
*/

var passport = require('passport');

var User = require('../models/db').User;
var Forms = require('../models/forms');
var Scripts = require('../models/scripts');

/*
  define shared server vars
*/

var io = require('../conf/server').io;

/*
  define shared controllers
*/

var navi = require('../lib/navi');
var que = require('../lib/que');
var form = require('../lib/forms');


/*
 * POST users listing.
 */

exports.add = function (req, res) {
  var user = new User({
    username : req.body.username,
    password : req.body.password,
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    email: req.body.email
  });

  user.save(function (err) {
    if (!err) {
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    } else {
      console.log(err);
      req.session.messages = {cls: ' alert-block', title: 'Error!', msg: 'looks like we had an issue registering your account, please try again'};
      res.redirect('/register#error');
    }
  });
};

/*
 * Registration page controller
 */

exports.register = function (req, res) {

  //get shorter reference of register form model
  var register = Forms.register;
  var scripts = Scripts.files;

  //render our form from the model
  form.render(register, function (f) {

    //load js & css
    que.embed(req, function (queued) {
      res.render('pages/register', {
        title: 'Registration Page',
        flash: req.session.messages,
        form: f,
        que: {
          head: queued.head,
          foot: queued.foot
        }
      });
      //start socket.io

      //end socket.io
    });
  });
};

exports.account = function(req, res) {

  //get shorter reference of register form model
  var settings = Forms.settings;
  var scripts = Scripts.files;
  //render our form from the model
  form.render(settings, function (f) {

    //render js & css
    navi.gator(req, function (gator) {

      que.embed(req, function (queued) {

        res.render('pages/account', {
          title: 'Welcome ',
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          user: req.user,
          form: {
            settings: f
          },
          flash: req.session.messages
        });
      });
    });
  });
};

exports.getlogin = function(req, res) {
  //get shorter reference of register form model
  var login = Forms.login;
  var scripts = Scripts.files;
  //render our form from the model
  form.render(login, function (f) {

    //load js & css
    que.embed(req, function (queued) {
      res.render('pages/login', {
        title: 'Registration Page',
        flash: req.session.messages,
        form: f,
        que: {
          head: queued.head,
          foot: queued.foot
        }
      });

      //start socket.io

      //end socket.io
    });
  });
};

exports.admin = function(req, res) {

  var settings = Forms.settings;
  var scripts = Scripts.files;
  //render our form from the model
  form.render(settings, function (f) {
    //render js & css
    navi.gator(req, function (gator) {

      que.embed(req, function (queued) {

        res.render('pages/admin', {
          title: 'Welcome ',
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          user: req.user,
          form: {
            settings: f
          },
          flash: req.session.messages
        });
      //start socket.io

      //end socket.io        
      });
    });
  });
};

exports.postAccount = function (req, res, next) {
  var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  User.update({ username: req.user.username }, user, {safe: true}, function (err) {
    if (!err) {
      return res.redirect('/account#settings');
    } else {
      req.session.messages = [info.message];
      return res.redirect('/account');
    }
  });
};

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
//   
/***** This version has a problem with flash messages
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
*/
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      console.log([info.message]);
      req.session.messages = [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};