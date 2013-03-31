
/*
  define models
*/

var User = require('../models/db').User;
var Forms = require('../models/forms');

/*
  define shared server vars
*/

var io = require('../server').io;

/*
  define shared controllers
*/

var que = require('../lib/que');
var form = require('../lib/forms');
var inject = require('../lib/shot');
var token = require('../lib/hash');

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
  console.log(req.body);
  token.make(req.body.hash, function (err, salted, hashed) {

    if (err) {
      console.log('err');
      console.log(err);
    }

    var user = new User({
      username : req.body.username,
      salt: salted,
      first_name: req.body.first_name || null,
      last_name: req.body.last_name || null,
      email: req.body.email
    });
    user.save(function (err) {
      if (!err) {
        req.session.messages = 'created';
        res.redirect('/');
      } else {
        console.log(err);
        req.session.messages = 'error';
        res.redirect('/register');
      }
    });
  });
};

/*
 * Registration page controller
 */

exports.register = function (req, res) {

  //get shorter reference of register form model
  var register = Forms.register;

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
      io.sockets.on('connection', function (socket) {

        socket.on('register', function (data) {
          // form.match(data, function (matched) {
          //   console.log(matched);
          // });
          console.log(data);
        });
      });
      //end socket.io
    });
  });
};