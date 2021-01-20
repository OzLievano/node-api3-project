const User = require('../users/users-model')

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
}

function validatePostId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
};
