/*
  add additional middleware
*/
var que = require('../lib/que');
var navi = require('../lib/navi');
var cookie = require('../lib/cookies');
/*
 * GET home page.
 */

exports.index = function (req, res) {

  if (typeof req.session.salt != 'undefined' && res.cookie) {
    res.cookie('logged_in', req.session.salt, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
  }

  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/index', {
        title: 'Welcome ',
        que: {
          head: queued.head,
          foot: queued.foot
        },
        nav: gator
      });
    });
  });
};