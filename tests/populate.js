//tests/populate.js
var makeSample = {};
makeSample.init = function () {
  this.forum();
};

makeSample.forum = function () {
  var forum = new Forum({name: 'General Discussion', ip: '127.0.0.1'});

  forum.save(function (err) {
    if (!err) {

      console.log('forum: ' + forum.name + " saved.");
      makeSample.topic();
    } else {
      console.log(err);
    }
  });
};

makeSample.topic = function () {
  var topic = new Topic({name: 'Sample Topic Name', _parent: 'general-discussion', ip: '127.0.0.1', message: 'hello world!', user: 'dhz'});

  topic.save(function (err) {
    if (!err) {
      console.log('topic created, woohoo!');
    } else {
      console.log(err);
    }
  });
};

makeSample.init();
