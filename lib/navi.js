//lib/navi.js
var gator = exports.gator = function (req, cb) {

  //usage

  // var n = navi.gator(req);
  // var t = req.query.token;
  // Tokens.ReadToken(req, req.query.token, function(unsealed) {
  //   var id = unsealed.id;
  // });

  var n = Object.create(require('../models/navi.js'));

  var current = req.route.path;

  var nav = (!req.user) ? n.noauth : n.auth;

  var i;

  for (i = 0; i < nav.length; ++i) {
    (function () {
      var k = i;

      if (current === nav[k].href) {
        nav[k].cur = "active";
      } else {
        nav[k].cur = null;
      }
    })();
  }

  // var nav_obj = Object.create(nav);
  cb(nav);
};
