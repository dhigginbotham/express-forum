/*
  add additional middleware
*/
var que = require('../lib/que');
var navi = require('../lib/navi');

var Scripts = require('../models/scripts');

//render home page
exports.index = function (req, res) {

  var scripts = Scripts.files;
  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/index', {
        title: 'Welcome ',
        que: {
          head: queued.head,
          foot: queued.foot
        },
        nav: gator,
        user: req.user
      });
    });
  });
};