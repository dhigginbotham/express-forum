//client/crud.js
var CrudClass = (function() {
  var socket = io.connect('/');
  var s;

    return {
      settings: {
        form: $('#create')
        , reg: $('#submit')
      },
      init: function() {
        s = this.settings;
        CrudClass.bind();
        HelperClass.NicEditor('forum_desc');
      },
      bind: function() {
        s.reg.bind('click', function() {
          socket.emit('create_forum', s.form.serializeArray());
        });
      }
    }
})();

$(document).ready(function() {
  CrudClass.init();
});