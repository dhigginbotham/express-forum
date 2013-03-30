//models/scripts.js
/*
  @author dhigginbotham <david@hillsoft.com>
  
  this method will handle a wordpress-like enqueue script
  it's not dynamic like the form methods, because i don't think it needs
  to be, but that could change...

*/

var scripts = module.exports = {};

scripts.files = [

  //header scripts
  {src : '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', name : 'jquery.js', where : 'head', uri : null, type : 'js'},
  {src : '/socket.io/socket.io.js', name : 'socket.io.js', where : 'head', uri : null, type : 'js'},

  //header css
  {src : '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.no-icons.min.css', name : 'bootstrap.css', where : 'head', uri : null, type : 'css'},
  {src : '//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css', name : 'font-awesome.css', where : 'head', uri : null, type : 'css'},
  {src : '/css/login.css', name : 'login.css', where : 'head', uri : '/register', type : 'css'},
  // {src : '/css/footer.css', name : 'footer.css', where : 'head', uri : null, type : 'css'},

  //footer scripts
  {src : '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js', name : 'bootstrap.js', where : 'foot', uri : null, type : 'js'},
  {src : '/js/helpers.js', name : 'helpers.js', where : 'foot', uri : null, type : 'js'},
  {src : '/js/register.js', name : 'register.js', where : 'foot', uri : '/register', type : 'js'}

];

