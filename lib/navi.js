//lib/navi.js
var gator = exports.gator = function (req, cb) {

  //usage

  // var n = navi.gator(req);
  // var t = req.query.token;
  // Tokens.ReadToken(req, req.query.token, function(unsealed) {
  //   var id = unsealed.id;
  // });

  var n = require('../models/navi.js');

  var current = req.route.path;

  var nav = (!req.session.auth_token) ? n.noauth : n.auth;

  var i;

  for (i = 0; i < nav.length; ++i) {
    (function () {
      var k = i;
      if (req.query.token) {
        nav[i].token = req.session.auth_token;
      }

      if (current === nav[i].href) {
        nav[i].cur = "active";
      } else {
        nav[i].cur = null;
      }
    })();
  }

  cb(nav);
  console.log(nav);
};