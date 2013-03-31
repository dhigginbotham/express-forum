//lib/shot.js
var Shot = require('shot');

var inject = module.exports = {};

inject.ion = function (req, res, cb) {

  Shot.inject(this.patch(req, res), { method: 'post', url: '/'}, function (res) {

    console.log(res.payload);
  });
};

inject.patch = function (req, res) {

  var reply = 'Hello World';
  res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': reply.length });
  res.end(reply);
};

/*

*/

inject.io = function (io, cb) {

  io.sockets.on('connection', function (socket) {
    console.log('a user has connected!');
    cb(socket);
  });

};

