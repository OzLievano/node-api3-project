const express = require('express');

const server = express();
const userRouter = require('./users/users-router')
const postRouter = require('./posts/posts-router')

server.use(express.json())
server.use('/users',userRouter);
server.use('/posts',postRouter);

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
