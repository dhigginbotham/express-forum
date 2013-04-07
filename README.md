#express-forum
Here's a node.js forum in the making. Socket.IO, Bootstrap UI and Express.js -- sounds about right for a forum these days. Uses passport, currently only supports local strategy, but I plan on adding the big four in soon.

###Version
0.2.5

##Todos
- crud api methods and routes
- scope issue, might sleep on it 
- test all for loops for non async usage
- design better template structure than current mess
- integrate [socket.io chat](https://github.com/dhigginbotham/rwi-chat)
- Views: Create, Edit, View, Profile, Message, Photos/Media
- map app module for prefix crud routes

##API Routes
These are subject to change but this is the intended outcome:

###Forum Routes:
```
  forums/:id/new                                PUT
  forums/:id/delete                             DELETE
  forums/:id/update                             POST
  forums/:id (defaults to /view)                GET
```

###Topics Routes:
```
  forums/:id/topics/:id/new                     PUT
  forums/:id/topics/:id/delete                  DELETE
  forums/:id/topics/:id/update                  POST
  forums/:id/topics/:id (defaults to /view)     GET
```

###Account Routes:
```
  account/:id/new                               PUT
  account/:id/delete                            DELETE
  account/:id/update                            POST
  account/:id (defaults to /view)               GET
```

###Message Routes:
```
  messages/:id/new                               PUT
  messages/:id/delete                            DELETE
  messages/:id/update                            POST
  messages/:id (defaults to /view)               GET
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