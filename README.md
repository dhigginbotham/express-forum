### express-forum
Here's a node.js forum in the making. Socket.IO, Bootstrap UI and Express.js -- sounds about right for a forum these days. Uses passport, currently only supports local strategy, but I plan on adding the big four in soon.

###Todos
- crud api methods and routes
- scope issue, might sleep on it 
- test all for loops for non async usage
- design better template structure than current mess
- integrate [socket.io chat](https://github.com/dhigginbotham/rwi-chat)
- Views: Create, Edit, View, Profile, Message, Photos/Media
- map app module for prefix crud routes

###API Routes
These are a work in progress, basically drawing board until I make some real definitions:
```
  /a || /u || /f ??
    /new
    /delete
    /update
    /view

  inherit next from parent id/slug?
  .../forums
      /new
      /delete
      /update
      /view
  .../topics
      /new
      /delete
      /update
      /view
  .../messages
      /new
      /delete
      /update
      /view

  example: :forum/new
  example: :forum/delete
  example: :forum/update
  example: :forum (defaults to /view)

  example: :forum/:topic/new
  example: :forum/:topic/delete
  example: :forum/:topic/update
  example: :forum/:topic (defaults to /view)

  /login
  /register
  /logout
```

###Version
0.2

If you'd like to contribute to this project just shoot me a pull request.

###License
(The MIT License)

Copyright (c) 2013 [David Higginbotham](david@hillsoft.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
