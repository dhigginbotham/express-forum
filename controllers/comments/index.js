//index.js
/************************************************
module pattern
************************************************/
// var express = require('express');
// var app = module.exports = express();

/************************************************
require libs
************************************************/
var que = require('../../lib/que'); //load scripts
var navi = require('../../lib/navi'); //load nav

/************************************************
require db model
************************************************/
var Comment = require('../../models/db').Comment;

/************************************************
Initialize Comments
************************************************/
var _c = module.exports = {};

/************************************************
POST ROUTES ../:tid/reply
************************************************/
_c.post = {};

_c.post.new = function (req, res) {

};
_c.post.delete = function (req, res) {

};
_c.post.update = function (req, res) {

};
_c.post.view = function (req, res) {

};

/************************************************
GET ROUTES ../:tid/reply
************************************************/
_c.get = {};

_c.get.new = function (req, res) {

};
_c.get.delete = function (req, res) {

};
_c.get.update = function (req, res) {

};
_c.get.view = function (req, res) {

};