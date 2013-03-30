
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
  username: { type: String, validate: [validatePresenceOf, ' is required'] },
  hash: String,
  first_name: { type: String, validate: [validatePresenceOf, ' is required'] },
  last_name: String,
  email: { type: String, validate: [validatePresenceOf, ' is required'] },
  logcount: Number,
  created: Date,
  updated: Date
});

/*
  define ForumSchema
*/

var ForumSchema = new Schema({
  id: { type: ObjectId, index: true }, //++i
  name: { type: String, validate: [validatePresenceOf, ' is required'] }, //string 50
  slug: String, //string 50
  desc: String, //string 255
  updated: Date, //datetime
  created: Date //datetime
});

/*
  define TopicSchema
*/

var TopicSchema = new Schema({
  id: { type: ObjectId, index: true }, //forum the msg is posted in
  forum: { type: ObjectId }, //++i
  user: {}, //user id
  title: { type: String, validate: [validatePresenceOf, ' is required'] }, //string 200
  slug: String, //string 200
  created: Date, //datetime
  updated: Date, //datetime
  count: Number, //int
  parent: { type: ObjectId }, //int
  message: { type: String, validate: [validatePresenceOf, ' is required'] } //text
});

/*
  define MessageSchema
*/

var MessageSchema = new Schema({
  id: { type: ObjectId, index: true }, //++i
  from: String, //user id from
  to: { type: String, validate: [validatePresenceOf, ' is required'] }, //user id to
  title: { type: String, validate: [validatePresenceOf, ' is required'] }, //string 200
  created: Date, //datetime
  msg: { type: String, validate: [validatePresenceOf, ' is required'] } //string 500
});

/*
  export the model so it can play nice with others ;)
*/

exports.User = mongoose.model('User', UserSchema);
exports.Forum = mongoose.model('Forum', ForumSchema);
exports.Topic = mongoose.model('Topic', TopicSchema);
exports.Message = mongoose.model('Message', MessageSchema);
