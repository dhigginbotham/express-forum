//index.js
// var express = require('express');
// var app = module.exports = express();

//require libs
var que = require('../../lib/que'); //load scripts
var navi = require('../../lib/navi'); //load nav

//require db model
var Topic = require('../../models/db').Topic;
var Comment = require('../../models/db').Comment;

//build routes
var routes = module.exports = {};

routes.get = {};
routes.post = {};

routes.get.view = function (req, res) {
  var __q = {};
  
  if (req.route.params.fid) {
    __q = {_parent: req.route.params.fid};
  }
  Topic.find(__q).sort({'created': -1}).populate('user _parent').exec( function (err, docs) {
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

routes.get.viewSingle = function (req, res) {
  var __q = {};
  
  if (req.route.params.tid) {
    __q = {_parent: req.route.params.tid};
  }

  Comment.find(__q)/*.sort({'created': -1})*/.populate('user _parent').exec( function (err, docs) {
    if (req.query.json) {
      if (!err) {
      } else {
        console.log(err);
        req.session.messages = 'something bad happened';
      }
    } else {
      //render js & css
      navi.gator(req, function (gator) {

        que.embed(req, function (queued) {

          res.render('pages/topics/single', {
            title: 'xfm-beta ',
            que: {
              head: queued.head,
              foot: queued.foot
            },
            nav: gator,
            user: req.user,
            docs: docs,
          });
        });
      });
    }
  }); 
};

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

        res.render('pages/topics/create', {
          title: 'xfm-beta ',
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          form: {uri: 'create', method: 'POST'},
          parents: forums,
          user: req.user,
          flash: req.session.messages
        });
      });
    });
  });
};

routes.post.create = function (req, res) {
  var fid = [];
  var tid = [];

  if (req.route.params.fid) {
    fid.push(req.route.params.fid);
  }

  if (req.route.params.tid) {
    tid.push(req.route.params.tid);
  }

  var topic = new Topic({
    name: req.body.topic_name,
    ip: req.ip,
    message: req.body.topic_desc,
    user: req.user._id,
    _parent: fid,
    _child: tid
  });

  topic.save(function (err) {
    if (err) {
      console.log(err);
      req.session.messages = JSON.stringify(err);
      res.redirect(req.originalUrl + '#error');
      delete req.session.messages;
    } else {
      req.session.messages = 'awesome you added a topic!';
      res.redirect(req.originalUrl + '#success');
      delete req.session.messages;
    }
  });
};
