const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  // do your magic!
  const date = new Date()
  console.log(`${req.method},${req.originalUrl},${date.getTime()}`)
  next();
}

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  User.getById(id)
  .then((user)=>{
    if(user){
      req.user = user;
      next()
    }else{
      res.status(404).json({message:"user doesn't exist"})
    }
  })
  
}

function validateUser(req, res, next) {
  // do your magic!
  const newUser = req.body;
  User.insert(newUser)
  .then((user)=>{
    if(!newUser.name){
      res.status(404).json({error:'please include a name'})
    }else{
      res.status(201).json({message:"user created"})
      next()
    }
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })
}

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  Post.getById(id)
  .then((post)=>{
    if(post){
      req.post = post;
      next()
    }else{
      res.status(404).json({message:"post doesn't exist"})
    }
  })
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  !body || body === {} ?
    res.status(400).json({ message: 'Please include request body' })
    :
    next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
};
