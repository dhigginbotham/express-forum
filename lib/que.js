//lib/que.js

/*
  @author dhigginbotham <david@hillsoft.com>
  
  this method will handle a wordpress-like enqueue script
  it's not dynamic like the form methods, because i don't think it needs
  to be, but that could change...

*/

var que = module.exports = {};

que.embed = function (req, cb) {

  var scripts = require('../models/scripts').files; //require the conf file

  var loaded = {
    head: {
      js: [],
      css: []
    },
    foot: {
      js: [],
      css: []
    }
  };

  var i;

  for (i = 0; i < scripts.length; ++i) {

    var ctx = scripts[i];

    if ((loaded.head[ctx.type] || loaded.foot[ctx.type]) && (ctx.uri === req.route.path || ctx.uri === null)) {
      loaded[ctx.where][ctx.type].push(ctx);
    }
  }

  cb(loaded);

};
