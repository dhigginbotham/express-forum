#express-forum
Here's a node.js forum in the making. Socket.IO, Bootstrap UI and Express.js -- sounds about right for a forum these days. Uses passport, currently only supports local strategy, but I plan on adding the big four in soon.

###Version
0.2.7

##Todos
- clean up utter mess...
- integrate [socket.io chat](https://github.com/dhigginbotham/rwi-chat)

##API Routes
These are subject to change but this is the intended outcome:

###Forum Routes:
```
  /f/:id/new                                     PUT         ** POST **
  /f/:id/delete                                  DELETE
  /f/:id/update                                  POST
  /f/:id (defaults to /view)                     GET
```

###Topics Routes:
```
  /f/:fid/:tid/new                               PUT         ** POST **
  /f/:fid/:tid/delete                            DELETE
  /f/:fid/:tid/update                            POST
  /f/:fid/:tid (defaults to /view)               GET
```

###Comments Routes: _highly experimental_
```
  /c/:id/new                                     PUT         ** POST **
  /c/:id/delete                                  DELETE
  /c/:id/update                                  POST
  /c/:id (defaults to /view)                     GET
```

###Account Routes:
```
  /a/:id/new                                     PUT         ** POST **
  /a/:id/delete                                  DELETE
  /a/:id/update && /a                            POST
  /a/:id (defaults to /view)                     GET
```

###Message Routes:
```
  /m/:id/new                                     PUT         ** POST **
  /m/:id/delete                                  DELETE
  /m/:id/update                                  POST
  /m/:id (defaults to /view)                     GET
```

##License
```
(The MIT License)
Copyright (c) 2013 David Higginbotham (david@hillsoft.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```