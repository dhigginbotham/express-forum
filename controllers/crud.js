//controllers/crud.js
var que = require('../lib/que');
var navi = require('../lib/navi');

var Scripts = require('../models/scripts');

//socket.io fun
var io = require('../conf/server').io;

//get db model
var Forum = require('../models/db').Forum;

exports.post = {};
exports.get = {};

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

exports.get.create = function (req, res) {

  /**
  Route: :f/create
  Method: Get
  */
  

  Forum.find({}, function(err, docs) {
    if (!err) {
      var forums = docs;
      console.log(forums);
    } else {
      var forums = null;
    }

    //render js & css
    navi.gator(req, function (gator) {

      que.embed(req, function (queued) {

        res.render('pages/forums/add', {
          title: 'Welcome ',
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          form: {uri: '/f/create', method: 'POST'},
          parents: forums,
          user: req.user,
          flash: req.session.messages
        });
      });
    });
  });
};


exports.post.create = function (req, res) {
  /**
  Route: :f/create
  Method: Post
  */

  if (req.body.forum_parent === 'none') {
    req.body.forum_parent = null;
  }

  var forum = new Forum({
    name: req.body.forum_name,
    ip: req.ip,
    desc: req.body.forum_desc,
    parent: req.body.forum_parent
  });

  forum.save(function (err) {
    if (err) {
      req.session.messages = JSON.stringify(err);
      res.redirect('/f/create#error');
    } else {
      req.session.messages = 'awesome you added a forum!';
      return res.redirect('/f/create');
    }
  });
};

exports.get.view = function (req, res) {
  /**
  Route: :f/view
  Method: Get
  */
    Forum.find({}, function(err, docs) {
      if (req.query.json) {
        if (!err) {
          res.send(docs);
        } else {
          req.session.messages = 'something bad happened';
        }
      } else {
        return templateView(req, res, docs);
      }
    });
};

var templateView = exports.get.templateView = function (req, res, docs) {
  var scripts = Scripts.files;
  //render js & css
  navi.gator(req, function (gator) {

    que.embed(req, function (queued) {

      res.render('pages/forums/view', {
        title: 'Welcome ',
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

exports.post.modify = function (req, res) {

  /**
  Route: :f/view
  Method: Get
  */

  var forum = {
    name: req.body.forum_name,
    ip: req.ip,
    desc: req.body.forum_desc,
    parent: req.body.forum_parent,
    updated: new Date()
  };

  Forum.update({ username: req.user.username }, forum, {safe: true}, function (err) {
    if (!err) {
      return res.redirect('/f/update');
    } else {
      req.session.messages = 'error updating form' + req.body.forum_name;
      return res.redirect('/f/update#error');
    }
  });
};

exports.get.modify = function (req, res) {

  var scripts = Scripts.files;
  //render our form from the model
    //render js & css
    navi.gator(req, function (gator) {

      que.embed(req, function (queued) {

        res.render('pages/forums/update', {
          title: 'Welcome ',
          dest: 'forum',
          form: {uri: '/f/update', method: 'POST'},
          que: {
            head: queued.head,
            foot: queued.foot
          },
          nav: gator,
          user: req.user,
          flash: req.session.messages
        });
      //start socket.io

      //end socket.io        
      });
    });
};