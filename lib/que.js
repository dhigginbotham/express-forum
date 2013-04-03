//lib/que.js

/*
  @author dhigginbotham <david@hillsoft.com>
  
  this method will handle a wordpress-like enqueue script
  it's not dynamic like the form methods, because i don't think it needs
  to be, but that could change...

*/

var Scripts = function (ctx) {
  this.ctx = ctx;
};

Scripts.prototype.constructor = Scripts;

Scripts.prototype.ctx = function () {
  return Object.create(this.ctx);
};

var que = module.exports = {};

que.embed = function (req, cb) {

  var script = new Scripts(require('../models/scripts'));
  var scripts = script.ctx.files;

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
    ( function () {
      var u = i;
      var ctx = scripts[u];
        if ((loaded.head[ctx.type] || loaded.foot[ctx.type]) && (ctx.uri === req.route.path || ctx.uri === null)) {
          console.log('loading %s into %s', ctx.name, ctx.where);
          return loaded[ctx.where][ctx.type].push(ctx);
        }
    })();
  }

  var load = new Scripts(loaded);
  cb(load.ctx);

};


que.factory = function (o) {
  if (typeof Object.create !== 'function') {
    Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }
};
