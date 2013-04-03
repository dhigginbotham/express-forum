//controllers/crud.js

/*
  add additional middleware
*/
var que = require('../lib/que');
var navi = require('../lib/navi');

var io = require('../conf/server').io;
var Forum = require('../models/db').Forum;

exports.post = {};
exports.get = {};

exports.get.create = function (req, res) {

  /**
  Route: :f/create
  Method: Post
  */

  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

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
  // io.sockets.on('connection', function (socket) {
  //   socket.on('create_forum', function (data) {
  //   });
  // });
};

/**
var ForumSchema = new Schema({
  id: { type: ObjectId, index: true }, //++i
  name: { type: String, required: true }, //string 50
  slug: String, //string 50
  desc: String, //string 255
  updated: { type: Date, default: Date.now }, //datetime
  created: { type: Date, default: Date.now } //datetime
});
*/

exports.post.create = function (req, res) {
  var forum = new Forum({
    name: req.body.forum_name,
    desc: req.body.forum_desc
  });

  forum.save(function (err) {
    if (err) {
      req.session.messages = JSON.stringify(err);
      res.redirect('/f/create#error');
    } else {
      return res.redirect('/f/create#success');
    }
  });
};