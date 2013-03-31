//models/forms.js

var forms = module.exports = {};

/*
  vars

  @param name
  @param type
  @param std
  @param ctx
  @param desc
  
*/

forms.register = [

  {name: 'username', type: 'text', std: 'Login', ctx: null, desc: 'Suggested to use same name as forum.', db: 'username'},
  {name: 'hash', type: 'text', std: 'Password', ctx: null, desc: 'Strongly suggested not to use the same password as the forum!', db: 'hash'},
  {name: 'email', type: 'text', std: 'Email', ctx: null, desc: 'Optional, this helps if you\'re forgetful like I am.', db: 'email'},
  {name: 'first_name', type: 'text', std: 'First Name', ctx: null, desc: 'Optional, this helps if you\'re forgetful like I am.', db: 'first_name'},
  {name: 'last_name', type: 'text', std: 'Last Name', ctx: null, desc: null, db: 'last_name'},
  {name: 'title', type: 'string', std: 'Please Sign In'}

];

forms.forum = [

  {name: 'name', type: 'text', std: 'Forum Title', ctx: null, desc: null},
  {name: 'slug', type: 'text', std: 'Forum Permalink', ctx: null, desc: null},
  {name: 'desc', type: 'textarea', std: 'Forum Description', ctx: null, desc: null}

];

forms.topic = [

  {name: 'title', type: 'text', std: 'Topic Title', ctx: null, desc: null},
  {name: 'slug', type: 'text', std: 'Forum Permalink', ctx: null, desc: null},
  {name: 'message', type: 'wysiwyg', std: 'Forum Description', ctx: null, desc: null}

];

forms.msg = [

  {name: 'title', type: 'text', std: 'Topic Title', ctx: null, desc: null},
  {name: 'to', type: 'text', std: 'Select a username', ctx: null, desc: null},
  {name: 'msg', type: 'textarea', std: 'Message Body', ctx: null, desc: null}

];
