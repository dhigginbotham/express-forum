
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
  return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

/*
  define UserSchema
*/

var UserSchema = new Schema({
  id: { type: ObjectId, index: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  admin: { type: Boolean, required: true, default: false },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  logcount: Number,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
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
  define ForumSchema
*/

var ForumSchema = new Schema({
  id: { type: ObjectId, index: true }, //++i
  name: { type: String, required: true, unique: true }, //string 50
  parent: { type: ObjectId }, //string 50
  slug: { type: String, unique: true}, //string 50
  desc: String, //string 255
  updated: { type: Date, default: Date.now }, //datetime
  ip: { type: String, required: true },
  created: { type: Date, default: Date.now } //datetime
});

ForumSchema.pre('save', function (next) {
  var forum = this;

  if(!forum.isModified('name')) {
    return next();
  } else {
    forum.slug = makeSlug(forum.name);
    return next();
  }
});


/*
  define TopicSchema
*/

var TopicSchema = new Schema({
  id: { type: ObjectId, index: true }, //forum the msg is posted in
  forum: { type: ObjectId }, //++i
  user: {}, //user id
  title: { type: String, required: true }, //string 200
  slug: String, //string 200
  created: { type: Date, default: Date.now }, //datetime
  updated: { type: Date, default: Date.now }, //datetime
  count: Number, //int
  ip: { type: String, required: true },
  parent: { type: ObjectId }, //int
  message: { type: String, required: true } //text
});

/*
  define MessageSchema
*/

var MessageSchema = new Schema({
  id: { type: ObjectId, index: true }, //++i
  from: String, //user id from
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
var Message = exports.Message = mongoose.model('Message', MessageSchema);

// var usr = new User({ username: 'dhz2', email: 'david@hillsoft.com', password: 'secret', admin: true });
// usr.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('user: ' + usr.username + " saved.");
//   }
// });

// var forer = new Forum({name: 'some random name with slug fun', ip: '127.0.0.1'});
// forer.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('forum: ' + forer.name + " saved.");
//   }
// });