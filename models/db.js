
/*
  define modules
*/

var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

exports.mongoose = mongoose; 

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

/*
  init connection
*/

var db_string = process.env.XFM_STRING || 'mongodb://localhost/xfm';

mongoose.connect(db_string); //todo - change to process.env
  
var db = mongoose.connection; //export this

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

var makeSlug = function (value) {
// Generates a URL-friendly "slug" from a provided string.
// For example: "This Is Great!!!" transforms into "this-is-great"
  // 1) convert to lowercase
  // 2) remove dashes and pluses
  // 3) replace spaces with dashes
  // 4) remove everything but alphanumeric characters and dashes
  return value.toLowerCase().replace(/-+./g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
/*
  define UserSchema
*/

var UserSchema = new Schema({
  _id: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  logcount: Number,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  settings: {
    email_alerts: { type: Boolean, default: false },
    save_password: { type: Boolean, default: false },
    usernames: { type: Array, unique: true }
  },
  signature: String,
  location: String
});

// Bcrypt middleware
UserSchema.pre('save', function(next) {

  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

// Remember Me implementation helper method
UserSchema.methods.generateRandomToken = function () {
  var user = this,
      chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      token = new Date().getTime() + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};

/*
  define TopicSchema
*/

var CommentSchema = new Schema({
  _parent: [{ type: String, ref: 'Topic'}], //string 50
  user: [{type: String, ref: 'User'}],
  created: { type: Date, default: Date.now }, //datetime
  updated: { type: Date }, //datetime
  ip: { type: String, required: true },
  message: { type: String, required: true } //text
});

var TopicSchema = new Schema({
  _id: { type: String, index: true }, //forum the msg is posted in
  _parent: [{ type: String, ref: 'Forum'}], //string 50
  _child: [{ type: String, ref: 'Comment'}], //string 50
  user: [{type: String, ref: 'User'}], //user id
  name: { type: String, required: true }, //string 200
  created: { type: Date, default: Date.now }, //datetime
  updated: { type: Date }, //datetime
  ip: { type: String, required: true },
  message: { type: String, required: true } //text
});

TopicSchema.pre('save', function (next) {
  if(!this.isModified('name')) {
    return next();
  } else {
    this._id = makeSlug(this.name);
    return next();
  }
});
/*
  define ForumSchema
*/

var ForumSchema = new Schema({
  _id: { type: String, index: true }, //++i
  _parent: [{ type: String, ref: 'Forum'}], //string 50
  _child: [{ type: String, ref: 'Topic'}], //string 50
  name: { type: String, required: true, unique: true }, //string 50
  desc: String, //string 255
  user: [{type: String, ref: 'User'}],
  ip: { type: String, required: true },
  updated: { type: Date, default: Date.now }, //datetime
  created: { type: Date, default: Date.now } //datetime
});

ForumSchema.pre('save', function (next) {

  if(!this.isModified('name')) {
    return next();
  } else {
    this._id = makeSlug(this.name);
    return next();
  }
});

/*
  define MessageSchema
*/

var MessageSchema = new Schema({
  _id: { type: ObjectId, index: true }, //++i
  from: [{type: String, ref: 'User'}], //user id from
  to: { type: String, required: true }, //user id to
  title: { type: String, required: true }, //string 200
  created: { type: Date, default: Date.now }, //datetime
  msg: { type: String, required: true } //string 500
});

/*
  export the model so it can play nice with others ;)
*/

var User = exports.User = mongoose.model('User', UserSchema);
var Forum = exports.Forum = mongoose.model('Forum', ForumSchema);
var Topic = exports.Topic = mongoose.model('Topic', TopicSchema);
var Comment = exports.Comment = mongoose.model('Comment', CommentSchema);
var Message = exports.Message = mongoose.model('Message', MessageSchema);
