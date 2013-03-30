var SignUpClass = (function() {
  var socket = io.connect();
  var s;

    return {
      settings: {
        form: $('#login-form')
        , reg: $('#register')
        , login: $('#login')
      },
      init: function() {
        s = this.settings;
        SignUpClass.bind();
        HelperClass.DisableForm('#login-form');
      },
      bind: function() {
        s.reg.bind('click', function() {
          // console.log('clicked');
          socket.emit('register', s.form.serializeArray());
        });
      }
    }
})();

$(document).ready(function() {
  SignUpClass.init();
});