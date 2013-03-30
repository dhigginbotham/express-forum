/*
  add additional middleware
*/
var que = require('../lib/que');
var navi = require('../lib/navi');
/*
 * GET home page.
 */

exports.index = function (req, res) {
  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/index', {
        title: 'Node Forum',
        que: {
          head: queued.head,
          foot: queued.foot
        },
        nav: gator
      });
    });
  });
};