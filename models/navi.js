//models/navi.js
var navi = module.exports = {};

navi.auth = [
  {std : null, id : 'welcome', icon : 'home', cur : null, href : '/', token : null},
  {std : 'Account', id : 'account', icon : null, cur : null, href : '/account', token : null},
  {std : 'Logout', id : 'logout', icon : null, cur : null, href : '/logout', token : null}
];

navi.noauth = [
  {std : null, id : 'home', icon : 'home', cur : null, href : '/', token : null},
  {std : 'Login', id : 'login', icon : null, cur : null, href : '/login', token : null},
  {std : 'Register', id : 'register', icon : null, cur : null, href : '/register', token : null}
];
