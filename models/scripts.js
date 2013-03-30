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
  {src : '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', name : 'jquery.min.js', where : 'head', uri : null, type :  'js'},
  // {src : '/socket.io/socket.io.js', name : 'socket.io.js', where : 'head', uri :  null, type :  'js'},

  //header css
  {src : '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css', name : 'bootstrap-combined.min.css', where : 'head', uri : null, type :  'css'},
  // {src : '/css/footer.css', name :  'footer.css', where :  'head', uri :  null, type :  'css'},

  //footer scripts
  {src : '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js', name : 'bootstrap.min.js', where : 'foot', uri : null, type :  'js'},
  {src : '/js/helpers.js', name : 'helpers.js', where : 'foot', uri :  null, type :  'js'},
  {src : '/js/register.js', name : 'register.js', where : 'foot', uri :  '/register', type :  'js'}

];