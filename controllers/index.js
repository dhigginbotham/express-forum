
var que = require('./scripts');

/*
 * GET home page.
 */

exports.index = function(req, res){
  //render js & css
  que.render(req, function(queued) {

    res.render('pages/index', { 
      title: 'Node Forum',
      que: {
        head: queued.head,
        foot: queued.foot
      }
    });
  });
};