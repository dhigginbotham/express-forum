###node-forum / express-forum
Node.js needed a fun forum app with some new flashy technology. So here's my go at making a forum that takes advantage of Node.js w/ [Hapi.js](https://github.com/spumko/hapi) as well as Express.js frameworks, [Socket.IO](http://socket.io/) and uses [Bootstrap](http://twitter.github.com/bootstrap/) for it's UI. *I've got awhile to go*, but if you're interested in contributing shoot me a pull request. Fundamentals, and coding practices you will see in this project will be a little mix of a couple different Styles, however I do tend to be fairly consistant and I will work on documenting this project much better.

###Express Forum Differences

- the express build is currently using mongoose instead of mongoskin
- updated libs, JSLint passing mostly now (of course not all of it, there's a lot of hybrid syntax and reserved names that will always make her upset...)
- bit closer to MVC (don't hold me to this... my brain machine feels like i need more folders)
- passport.js module built in (local strategy for now, planning on the big four ['github','facebook','twitter','github<3'])

I'm leaning towards refactoring to fit within [Hapi.js](https://github.com/spumko/hapi/blob/master/docs/Style.md) style guide. It's pretty clean.

###Updates
This project is now in both [Express.js](https://github.com/dhigginbotham/express-forum) and [Hapi.js](https://github.com/dhigginbotham/node-forum) frameworks. I felt it was easy enough to keep them in fair parody.

4/2/2013 - Parody `failed` for now, I have to do some research on a couple of Hapi.js plugins and of course refactor some more Express.js code to hapi.js

###Todos

- socket.io pattern for updates like [Hapi.js - Shot](https://github.com/spumko/shot)
- crud api methods and routes
- scope issue, might sleep on it 
- closure pattern on for loops to fix async scope
- OAuth strategies with passport/travelogue
- refactor yar & lout to closure pattern
- test all for loops for incorrect field data
- add joi validation to all inputs
- Views: Create, Edit, View, Profile, Message, Photos/Media

###API Routes
These are a work in progress, basically drawing board until I make some real definitions
```
  /a || /u
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
0.0.9

###License
(The MIT License)

Copyright (c) 2013 [David Higginbotham](david@hillsoft.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
