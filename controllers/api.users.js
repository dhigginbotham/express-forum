//controllers/api.users.js

/*

  need to define all api routes for all user classes
  
  /settings
  /messages
  /account

*/

var api = exports.api = {};
api.post = {};
api.get = {};

//define all api gets



//define all api posts
api.post.add = function (req, res) {

  var user = new User({
    username : req.body.username,
    password : req.body.password,
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    email: req.body.email
  });

  user.save(function (err) {
    if (!err) {
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    } else {
      console.log(err);
      req.session.messages = err;
      res.redirect('/register#error');
    }
  });
};
