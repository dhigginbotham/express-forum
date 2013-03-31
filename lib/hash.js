//lib/hash.js
var pass = require('pwd');

var g = require('../models/globals').keys;

var key = g.hash_key;

pass.iterations(20000);

exports.make = function (ctx, cb) {

  pass.hash(key, function (err, salt, hash) {

    var user = {};

    user.salt = salt; //save this to something
    user.hash = hash; //save this to something

    console.log('here is the uses salt: %s \r\nand the users hash: %s', salt, hash);

    cb(err, salt, hash);
  });
};

exports.compare = function (ctx, cb) {

  var user = {};

  pass.hash(ctx.pwd, user.salt, function (err, hash) {

    if (user.hash === hash) {
      console.log(hash);
    }
  });
};