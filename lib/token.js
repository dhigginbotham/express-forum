//iron.lib.js
var Iron = require('iron');

//add globals & scope directly to private obj
var key = require('../models/globals')._keys.iron;

var _t = module.exports = {};

_t.schema = function (req, ctx, callback) {
  
  var schema = {};

  if (ctx.id) {
    //we can make a token!
    schema.id = ctx.id;
    schema.user = ctx.user;
    schema.host = req.connection.remoteAddress;
    schema.created = new Date().valueOf();
  } else {
    // return Boom.internal('some message', ctx);
  }

};

_t.expire = function(callback) {
  
  var date = new Date();

    return (callback) ? callback(date.setDate(date.getDate()+1)) : date.setDate(date.getDate()+1);
};

_t.seal = function(req, ctx, callback) {

  var s = (ctx) ? ctx : {};
  s.exp_date = this.expire();

  if (!s.exp_date || typeof s.exp_date === 'undefined') {
    return req.reply({"error":"this tokens expire date is invalid"});
  }

  Iron.seal(ctx, key, Iron.defaults, function (err, sealed) {

    if (req.session) {
      req.session.auth_token = sealed;
    }

    if (callback) {
      return callback(err, sealed);
    } else {
      if (err) {
        // return Boom.internal('some message', err);
      } else {
        return sealed;
      }
    }
  });
};

_t.unseal = function(req, ctx, callback) {

  var s = (ctx) ? ctx : null;
  var now = new Date().valueOf();

  Iron.unseal(ctx, key, Iron.defaults, function (err, unsealed) {
    
    if (now < unsealed.exp_date) {
      return (!callback) ? req.reply(unsealed) : callback(unsealed); 
    } else {
      return req.reply({"error": "this token is expired...", "exp": unsealed.exp_date});
    }
  });
};