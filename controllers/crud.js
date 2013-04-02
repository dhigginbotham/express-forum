//controllers/crud.js

/*
  add additional middleware
*/
var que = require('../lib/que');
var navi = require('../lib/navi');

var io = require('../conf/server').io;

var Scripts = require('../models/scripts');

exports.post = {};
exports.get = {};

exports.get.create = function (req, res) {
  var scripts = Scripts.files;
  /**
  Route: :f/create
  Method: Post
  */

  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, scripts, function (queued) {

      res.render('pages/create', {
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
  io.sockets.on('connection', function (socket) {
    console.log('we\'re connected yay');
    socket.on('create_forum', function(data) {

    });
  });    
};