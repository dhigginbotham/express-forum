
/*
  define modules
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

/*
  init connection
*/

mongoose.connect('mongodb://localhost/xfm'); //todo - change to process.env

/*
  validatePresenceOf
  useage: validate: [validatePresenceOf, ' is required'
*/

function validatePresenceOf(value) {
  return value && value.length;
}

/*
  define UserSchema
*/

var UserSchema = new Schema({
  id: { type: ObjectId, index: true },
  username: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  first_name: { type: String },
  last_name: String,
  email: { type: String, required: true, unique: true },
  logcount: Number,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

/*
  define ForumSchema
*/

var ForumSchema = new Schema({
  id: { type: ObjectId, index: true }, //++i
  name: { type: String, required: true }, //string 50
  slug: String, //string 50
  desc: String, //string 255
  updated: { type: Date, default: Date.now }, //datetime
  created: { type: Date, default: Date.now } //datetime
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

exports.User = mongoose.model('User', UserSchema);
exports.Forum = mongoose.model('Forum', ForumSchema);
exports.Topic = mongoose.model('Topic', TopicSchema);
exports.Message = mongoose.model('Message', MessageSchema);
