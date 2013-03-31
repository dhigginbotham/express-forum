//lib/session.js

var sessions = module.exports = {};

sessions.init = function (req, res, cb) {
  if ((req.session && req.session.user) || res.cookie.user) {
    console.log('we have a user!');
  } else {
    console.log('no users here bob..');
  }
};
sessions.logged_in = function (req, res, cb) {
  if (typeof req.session.user === 'undefined') {
    console.logged('still no users here bob');
  } else {
    //leaving off here for a bit
  }
};
sessions.logged_out = function (req, res, cb) {
  //delete session as well as cookie
  if (typeof res.cookie.user === 'undefined') {
    console.logged('logged out already');
  } else {
    delete req.session.user;
    res.clearCookie('user');
  }
};
sessions.remember_me = function (req, res, cb) {
  //store cookie forever...
  if (typeof req.session.salt != 'undefined') {
    res.cookie('logged_in', req.session.salt, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
  }
};
sessions.warning = function (req, res, cb) {
  //1 day warning ban / easily worked around lol
  res.cookie('warning', { salt: req.session.salt, ip: req.connection.remoteAddress }, { expires: new Date(Date.now() + 1), httpOnly: true, secure: true });
};