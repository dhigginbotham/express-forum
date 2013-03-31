//lib/cookies.js
var cookies = module.exports = {};

cookies.delLogin = function(req, res) { res.clearCookie('login_token'); res.redirect('/'); };
cookies.setLogin = function(req, res) { res.cookie('login_token', +new Date(), { maxAge: 3600000, path: '/' }); res.redirect('/'); };