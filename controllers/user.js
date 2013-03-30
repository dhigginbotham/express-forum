
/*
  define models
*/

var User = require('../models/db').User;
var Forms = require('../models/forms');

var que = require('./scripts');

/*
  define shared controllers
*/

var FormsHandler = require('./forms');

/*
 * GET users listing.
 */

exports.list = function (req, res) {
  User.find(function (err, users) {
    res.send(users);
  });
};

/*
 * POST users listing.
 */

exports.add = function (req, res) {
  var user = new User(req.body.user);
  user.created = new Date();
  user.save(function (err) {
    if (!err) {
      req.session.messages('info', 'Task created');
      res.redirect('/');
    } else {
      req.session.messages('warning', err);
      res.redirect('/register');
    }
  });
};

/*
 * Registration page controller
 */

exports.register = function (req, res) {

  //get shorter reference of register form model
  var register = Forms.register;

  //render our form from the model
  FormsHandler.render(register, function (form) {

    //load js & css
    que.render(req, function (queued) {

      res.render('pages/register', {
        title: 'Registration Page',
        flash: req.session.messages,
        form: form,
        que: {
          head: queued.head,
          foot: queued.foot
        }
      });
    });
  });
};