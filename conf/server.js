var express = exports.express = require('express');
var app = exports.app = express();
var server = exports.server = require('http').createServer(app);
var io = exports.io = require('socket.io').listen(server);