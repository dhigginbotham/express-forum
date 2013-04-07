//index.js
// var express = require('express');
// var app = module.exports = express();

//require libs
var que = require('../../lib/que'); //load scripts
var navi = require('../../lib/navi'); //load nav

//require db model
var Topic = require('../../models/db').Topic;

//build routes
var routes = module.exports = {};

routes.get = {};
routes.post = {};

routes.get.view = function (req, res) {
  var __q = {};
  
  if (req.route.params.fid) {
    __q = {_parent: req.route.params.fid};
  }

  /**
  Route: :forum/view
  Method: Get
  */

  Topic.find(__q, function (err, docs) {
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

          res.render('pages/forums/view', {
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

routes.get.viewSingle = function (req, res) {};

routes.get.create = function (req, res) {

  /**
  Route: :f/create
  Method: Get
  */

  Topic.find({}, function(err, docs) {
    if (!err) {
      var forums = docs;
    } else {
      var forums = null;
    }

    //render js & css
    navi.gator(req, function (gator) {

      que.embed(req, function (queued) {

        res.render('pages/forums/add', {
          title: 'xfm-beta ',
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          form: {uri: '/t/create', method: 'POST'},
          parents: forums,
          user: req.user,
          flash: req.session.messages
        });
      });
    });
  });
};

routes.post.create = function (req, res) {

  if (req.body.forum_parent === 'none') {
    req.body.forum_parent = null;
  }

  var topic = new Topic({
    name: req.body.forum_name,
    ip: req.ip,
    desc: req.body.forum_desc,
    user: req.user._id,
    _parent: req.body.forum_parent
  });

  topic.save(function (err) {
    if (err) {
      req.session.messages = JSON.stringify(err);
      res.redirect('/f/create#error');
    } else {
      req.session.messages = 'awesome you added a forum!';
      return res.redirect('/f/create');
    }
  });
};
