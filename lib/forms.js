//lib/forms.js

/*
  @author dhigginbotham <david@hillsoft.com>
  
  this method will handle a wordpress-like enqueue script
  it's not dynamic like the form methods, because i don't think it needs
  to be, but that could change...

*/

var forms = module.exports = {};

forms.render = function (form, cb) {

/*
  client-side form render method
*/

  var i, j;
  var updated = {};

  for (i = 0; i < form.length; ++i) {
    //make this form if it doesn't exist
    if (!updated[form[i].type]) {
      updated[form[i].type] = [];
    }
  }

  for (j = 0; j < form.length; ++j) {
    //make form array with types mashed to their own array
    if (updated[form[j].type]) {
      //push the values into the array
      updated[form[j].type].push(form[j]);
    }
  }

  cb(updated);
};
