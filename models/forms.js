//models/forms.js

var forms = module.exports = {};

forms.register = [
  {name: 'login', type: 'text', std: 'Login / Forum Name', ctx: null, desc: 'Suggested to use same name as forum.', db: 'username'},
  {name: 'pass', type: 'text', std: 'Password', ctx: null, desc: 'Strongly suggested not to use the same password as the forum!', db: 'hash'},
  {name: 'email', type: 'text', std: 'Email', ctx: null, desc: 'Optional, this helps if you\'re forgetful like I am.', db: 'email'},
  {name: 'first_name', type: 'text', std: 'First Name', ctx: null, desc: 'Optional, this helps if you\'re forgetful like I am.', db: 'first_name'},
  {name: 'last_name', type: 'text', std: 'Last Name', ctx: null, desc: null, db: 'last_name'},
  {name: 'title', type: 'string', std: 'Please Sign In'}
];

forms.forum = [

/*
  spec would be
  @param name
  @param type
  @param std
  @param ctx
  @param desc
  @param db
  
*/

];