//index.js
/************************************************
module pattern
************************************************/
// var express = require('express');
// var app = module.exports = express();

/************************************************
require libs
************************************************/
var que = require('../../lib/que'); //load scripts
var navi = require('../../lib/navi'); //load nav

/************************************************
require db model
************************************************/
var Comment = require('../../models/db').Comment;

/************************************************
Initialize Comments
************************************************/
var _c = module.exports = {};

/************************************************
POST ROUTES ../:tid/reply
************************************************/
_c.post = {};

_c.post.new = function (req, res) {
  var tid = [];

  if (req.route.params.tid) {
    tid.push(req.route.params.tid);
  }

  var comment = new Comment({
    name: req.body.topic_name,
    ip: req.ip,
    message: req.body.topic_desc,
    user: req.user._id,
    _parent: tid
  });

  comment.save(function (err) {
    if (err) {
      console.log(err);
      req.session.messages = JSON.stringify(err);
      res.redirect(req.originalUrl + '#error');
      delete req.session.messages;
    } else {
      req.session.messages = 'awesome you added a topic!';
      res.redirect('/f/' + req.route.params.fid + '/' + t._id + '/view');
      delete req.session.messages;
    }
  });

};
_c.post.delete = function (req, res) {

};
_c.post.update = function (req, res) {

};
_c.post.view = function (req, res) {

};

/************************************************
GET ROUTES ../:tid/reply
************************************************/
_c.get = {};

_c.get.new = function (req, res) {
  /**
  Route: ../:tid/c/new
  Method: GET
  */

  // Comment.find({}, function(err, docs) {
  //   if (!err) {
  //     var forums = docs;
  //   } else {
  //     var forums = null;
  //   }

    //render js & css
    navi.gator(req, function (gator) {

      que.embed(req, function (queued) {

        res.render('pages/topics/create', {
          title: 'xfm-beta ',
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          form: {uri: 'reply', method: 'POST'},
          parents: forums,
          user: req.user,
          flash: req.session.messages
        });
      });
    });
  // });
};
_c.get.delete = function (req, res) {

};
_c.get.update = function (req, res) {

};
_c.get.view = function (req, res) {
  var __q = {};
  
  if (req.route.params.tid) {
    __q = {_parent: req.route.params.tid};
  }

  Comment.find(__q).sort({'created': -1}).populate('user _parent').exec( function (err, docs) {
    if (req.query.json) {
      if (!err) {
        res.send(docs);
      } else {
        req.session.messages = 'something bad happened';
      }
    } else {
      //render js & css
      navi.gator(req, function (gator) {

        que.embed(req, function (queued) {

          res.render('pages/topics/list', {
            title: 'xfm-beta ',
            que: {
              head: queued.head,
              foot: queued.foot
            },
            nav: gator,
            user: req.user,
            docs: docs
          });
        });
      });
    }
  });
};

/************************************************
specific comment routes ../:tid/
************************************************/
