//models/forms.js

var forms = module.exports = {};

/*
  vars

  @param name
  @param type
  @param std
  @param ctx
  @param desc

  experiemental features to come:
  @param form_id
  @param form_hash (nonce style)
  @param socket_event
*/

forms.register = [
  {name: 'password', type: 'password', std: 'Password', ctx: null, desc: 'Strongly suggested not to use the same password as the forum!', db: 'password'},
  {name: 'email', type: 'text', std: 'your@email.com', ctx: null, desc: 'Optional, this helps if you\'re forgetful like I am.', db: 'email'},
  {name: 'first_name', type: 'text', std: 'First Name', ctx: null, desc: 'Optional, this helps if you\'re forgetful like I am.', db: 'first_name'},
  {name: 'last_name', type: 'text', std: 'Last Name', ctx: null, desc: null, db: 'last_name'},
  {name: 'username', type: 'text', std: 'Username', ctx: null, desc: 'Suggested to use same name as forum.', db: 'username'},
  {name: 'title', type: 'string', std: 'Registering is easy!'}
];

forms.forum = [
  {name: 'name', type: 'text', std: 'Forum Title', ctx: null, desc: null},
  {name: 'slug', type: 'text', std: 'Forum Permalink', ctx: null, desc: null},
  {name: 'desc', type: 'wysiwyg', std: 'Forum Description', ctx: null, desc: null}
];

forms.topic = [
  {name: 'title', type: 'text', std: 'Topic Title', ctx: null, desc: null},
  {name: 'slug', type: 'text', std: 'Forum Permalink', ctx: null, desc: null},
  {name: 'message', type: 'wysiwyg', std: 'Forum Description', ctx: null, desc: null}
];

forms.msg = [
  {name: 'title', type: 'text', std: 'Topic Title', ctx: null, desc: null},
  {name: 'to', type: 'text', std: 'Select a username', ctx: null, desc: null},
  {name: 'msg', type: 'wysiwyg', std: 'Message Body', ctx: null, desc: null}
];

forms.login = [
  {name: 'username', type: 'text', std: 'Login', ctx: null, desc: 'Suggested to use same name as forum.', db: 'username'},
  {name: 'password', type: 'password', std: 'Password', ctx: null, desc: 'Strongly suggested not to use the same password as the forum!', db: 'password'},
  {name: 'title', type: 'string', std: 'Login Box'}
];

forms.settings = [
  {name: 'username', type: 'text', std: 'username', ctx: null, db: 'username'},
  {name: 'title', type: 'text', std: 'title', ctx: null, db: 'title'},
  {name: 'first_name', type: 'text', std: 'first_name', ctx: null, db: 'first_name'},
  {name: 'email', type: 'text', std: 'email', ctx: null, db: 'email'},
  {name: 'last_name', type: 'text', std: 'last_name', ctx: null, db: 'last_name'}
];
