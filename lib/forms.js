//lib/forms.js

/*
  @author dhigginbotham <david@hillsoft.com>
  
  this method will handle a wordpress-like enqueue script
  it's not dynamic like the form methods, because i don't think it needs
  to be, but that could change...

*/

var forms = module.exports = {};

forms.render = function (form, cb) {

  var f = Object.create(form);
/*
  client-side form render method
*/

  var i, r;
  var updated = {};

  for (i = 0; i < f.length; ++i) {
    (function () {
      var r = i;
      //make this f if it doesn't exist
      if (!updated[f[r].type]) {
        updated[f[r].type] = [];
      }
      //make f array with types mashed to their own array
      if (updated[f[r].type]) {
        //push the values into the array
        updated[f[r].type].push(f[r]);
      }
    })();
  }

  cb(updated);
};

forms.match = function (ctx, cb) {

  var matched = [];
  var m, el;

  for (m = 0; m < ctx.length; ++m) {
    (function () {
      var t = m;
      process.nextTick( function() {
        el = ctx[t];
        var pair = {};
        pair[el.name] = el.value;
        matched.push(pair);
      });
    })();
  }

  cb(matched);
};

forms.pair = function (req, form, cb) {

/*
  client-side form render method
*/
  
  var user = req.user;
  var i, r;
  var updated = {};

  for (i = 0; i < form.length; ++i) {
    (function () {
      var r = i;
        if (!form[r].ctx) {
          form[r].ctx = user[form[r].db];
        }
        //make this form if it doesn't exist
        if (!updated[form[r].type]) {
          updated[form[r].type] = [];
        }
        //make form array with types mashed to their own array
        if (updated[form[r].type]) {
          //push the values into the array
          updated[form[r].type].push(form[r]);
        }
    })();
  }
  cb(updated);
};