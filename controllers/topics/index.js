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
            title: 'View Topics ',
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
  routes.commentQuery(req, res, function(err, comment) {
    if (err) {
      req.session.messages = 'bad stuff here';
      console.log(err);
    }

    if (comment.length < 1) {

      routes.topicQuery(req, res, function(err, topic) {
        if(err) return console.log('error getting topic');
        routes.renderTopicsView(req, res, topic);
      });

    } else {

      routes.renderCommentsView(req, res, comment);
    }
  }); 
};

routes.topicQuery = function (req, res, cb) {

  var __q = {};
  
  if (req.route.params.tid) {
    __q = {_id: req.route.params.tid};
  }

  Topic.find(__q).sort({'created': -1}).populate('user _parent').exec( function (err, docs) {
    if (req.query.json) {

      if (!err) {
        res.send(docs);
      } else {
        req.session.messages = 'something bad happened';
        cb(err);
      }

    } else {
      cb(null, docs);
    }

  });
};

routes.commentQuery = function (req, res, cb) {

  var __q = {};
  
  if (req.route.params.tid) {
    __q = {_parent: req.route.params.tid};
  }

  Comment.find(__q).populate('user _parent').exec( function (err, docs) {
    if (req.query.json) {

      if (!err) {
        res.send(docs);
      } else {
        req.session.messages = 'something bad happened';
        cb(err);
      }

    } else {
      cb(null, docs);
    }
  });
};

routes.renderTopicsView = function (req, res, docs) {
  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/topics/single', {
        title: docs.name,
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
};

routes.renderCommentsView = function (req, res, docs) {
  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/topics/multi', {
        title: docs[0]._parent[0].name,
        que: {
          head: queued.head,
          foot: queued.foot
        },
        nav: gator,
        user: req.user,
        docs: docs,
        _parent: docs[0]._parent
      });
    });
  });
};

// routes.get.viewSingle = function (req, res) {
//   var __q = {};
  
//   if (req.route.params.tid) {
//     __q = {_parent: req.route.params.tid};
//   }

//   Comment.find(__q)/*.sort({'created': -1})*/.populate('user _parent').exec( function (err, docs) {
//     if (req.query.json) {
//       if (!err) {
//         res.send(docs);
//       } else {
//         console.log(err);
//         req.session.messages = 'something bad happened';
//       }
//     } else {
//       //render js & css
//       navi.gator(req, function (gator) {

//         que.embed(req, function (queued) {

//           res.render('pages/topics/single', {
//             title: 'xfm-beta ',
//             que: {
//               head: queued.head,
//               foot: queued.foot
//             },
//             nav: gator,
//             user: req.user,
//             docs: docs,
//           });
//         });
//       });
//     }
//   }); 
// };

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
          title: 'Create New Topic ',
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
    _parent: fid
  });

  topic.save(function (err, t) {
    if (err) {
      req.session.messages = JSON.stringify(err);
      res.redirect(req.originalUrl + '#error');

      // delete req.session.messages;
    } else {
      req.session.messages = 'awesome you added a topic!';
      res.redirect('/f/' + req.route.params.fid + '/' + t._id + '/view');
      
      // delete req.session.messages;
    }
  });
};
