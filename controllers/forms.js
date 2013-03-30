//controllers/forms.js

var forms = module.exports = {};

forms.render = function (form, cb) {

/*
  this renders the form for the clientside
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