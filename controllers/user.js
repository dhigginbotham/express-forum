
/*
  define models
*/

var passport = require('passport');
var crypto = require('crypto');

var User = require('../models/db').User;
var Comment = require('../models/db').Comment;
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

exports.get = {};
exports.post = {};

exports.add = function (req, res) {
  var id = req.body.username;

  console.log(id);

  var user = new User({
    _id: id,
    username : id,
    password : req.body.password,
    ip: req.ip,
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    email: req.body.email
  });

  user.save(function (err) {
    if (!err) {
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/f/view');
      });
    } else {
      req.session.messages = {cls: ' alert-block', title: 'Error!', msg: 'bad sause!'};
      console.log(err);
      return res.redirect('/register');
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
        title: 'Registration Page ',
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

exports.get.view = function (req, res) {
  /**
  Route: :f/view
  Method: Get
  */
  User.find().sort({'created': -1}).exec(function(err, docs) {
    if (req.query.json) {
      if (!err) {
        res.send(docs);
      } else {
        req.session.messages = 'something bad happened';
      }
    } else {
      var scripts = Scripts.files;
      //render js & css
      navi.gator(req, function (gator) {

        que.embed(req, function (queued) {

          res.render('pages/accounts/users', {
            title: 'xfm-beta ',
            que: {
              head: queued.head,
              foot: queued.foot
            },
            nav: gator,
            user: req.user,
            docs: docs
          });
        });
      });
    }
  });
};

exports.get.viewUser = function (req, res) {
  /**
  Route: :f/view
  Method: Get
  */

  User.find({username: req.route.params.usr}, function(err, docs) {
    if (err) return err;

    if (req.query.json) {
      if (!err) {
        res.send(docs[0]);
      } else {
        req.session.messages = 'something bad happened';
      }
    } else {
      if(!err) {
        Comment.find({user: req.user._id}).populate('_parent').exec(function (err, comments) {

          var email = docs[0].email;
          var hash = crypto.createHash('md5').update(email).digest("hex");

          var scripts = Scripts.files;

          //render js & css
          navi.gator(req, function (gator) {

            que.embed(req, function (queued) {

              res.render('pages/accounts/view', {
                title: 'xfm-beta ',
                que: {
                  head: queued.head,
                  foot: queued.foot
                },
                nav: gator,
                user: req.user,
                docs: docs[0],
                hash: hash,
                comments: comments
              });
            });
          });
        });
      } else {
        req.session.messages = 'nonono';
      }
    };
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

exports.postAccount = function (req, res, next) {

  var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  User.update({ username: req.user.username }, user, {safe: true}, function (err) {
    if (!err) {
      return res.redirect('/a#settings');
    } else {
      req.session.messages = [info.message];
      return res.redirect('/a');
    }
  });
};

exports.get.makeAdmin = function (req, res) {
  var user = {
    admin: true,
    ip: req.ip,
    updated: new Date()
  };

  User.update({ username: req.user.username }, user, {safe: true}, function (err) {
    if (!err) {
      req.session.messages = 'You are teh admin nao';
      return res.redirect('/a');
    } else {
      req.session.messages = 'Oh, sorry no admin for you apparently :(';
      return res.redirect('/a#error');
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
      return res.redirect('/f/view');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.post.modify = function (req, res) {

  var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    location: req.body.location,
    signature: req.body.signature,
    ip: req.ip,
    updated: new Date()
  };

  User.update({ username: req.user.username }, user, {safe: true}, function (err) {
    if (!err) {
      return res.redirect('/a#settings');
    } else {
      req.session.messages = [info.message];
      return res.redirect('/a');
    }
  });
};

exports.get.modify = function (req, res) {

  var email = req.user.email;
  var hash = crypto.createHash('md5').update(email).digest("hex");

  var scripts = Scripts.files;
    //render js & css
    navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/accounts/update', {
        title: 'xfm-beta ',
        dest: 'forum',
        form: {uri: '/a/update', method: 'POST'},
        que: {
          head: queued.head,
          foot: queued.foot
        },
        nav: gator,
        user: req.user,
        hash: hash,
        flash: req.session.messages
      });
    //start socket.io

    //end socket.io        
    });
  });
};

exports.get.uplift = function (req, res) {

  var user = {
    admin: true
  };

  User.update({ _id: req.route.params.usr }, user, {safe: true}, function (err) {
    if (!err) {
      res.redirect('/a#settings');
    } else {
      // req.session.messages = [info.message];
      res.redirect('/a');
    }
  });
};

exports.get.delete = function (req, res) {

  User.remove({ _id: req.route.params.usr }, {safe: true}, function (err) {
    if (!err) {
      res.redirect('/a#settings');
    } else {
      // req.session.messages = [info.message];
      res.redirect('/a');
    }
  });
};