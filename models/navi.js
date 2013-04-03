//models/navi.js
var navi = module.exports = {};

navi.auth = [
  {std : null, id : 'welcome', icon : 'home', cur : null, href : '/', token : null},
  {std : 'Account', id : 'account', icon : null, cur : null, href : '/a', token : null},
  {std : 'View All Users', id : 'account', icon : null, cur : null, href : '/a/view/all', token : null},
  // {std : 'Logout', id : 'logout', icon : null, cur : null, href : '/logout', token : null},
  {std : 'Add Forum', id : 'admin', icon : null, cur : null, href : '/f/create', token : null},
  {std : 'View Forums', id : 'admin', icon : null, cur : null, href : '/f/view', token : null}
];

navi.noauth = [
  {std : null, id : 'home', icon : 'home', cur : null, href : '/', token : null},
  {std : 'Login', id : 'login', icon : null, cur : null, href : '/login', token : null},
  {std : 'Register', id : 'register', icon : null, cur : null, href : '/register', token : null}
];
