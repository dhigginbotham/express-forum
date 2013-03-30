//models/navi.js
var navi = module.exports = {};

navi.auth = [
  {std : null, id : 'welcome', icon : 'home', cur : null, href : '/dashboard', token : null},
  {std : 'Account', id : 'home', icon : null, cur : null, href : '/account', token : null},
  {std : 'Logout', id : 'home', icon : null, cur : null, href : '/logout', token : null}
];

navi.noauth = [
  {std : 'Login', id : 'home', icon : 'home', cur : null, href : '/auth', token : null},
  {std : 'Help', id : 'home', icon : null, cur : null, href : '/help', token : null}
];
