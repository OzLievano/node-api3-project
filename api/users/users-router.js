const express = require('express');
const User = require('./users-model.js')
const Posts = require('../posts/posts-model')
const {logger,validateUserId} = require('../middleware/middleware');
const router = express.Router();

router.post('/',logger ,(req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  const newUser = req.body;
  console.log(newUser)

  User.insert(newUser)
  .then((users)=>{
    res.status(201).json(newUser)
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  const {id}=req.params;
  User.getById(id)
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  const {id}=req.params;
  User.remove(id)
  .then((user)=>{
    res.status(200).json({message:"user deleted"})
  })
  .catch((err)=>{
    res.status(500).json({error:"Unable to delete user"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  const changes = req.body;

  User.update(id,changes)
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  const newPost = {...req.body,user_id:id};

  User.getUserPosts(id)
  .then((posts)=>{
    if(!posts){
      res.status(404).json({error:"user not found"})
    }else{
      if(newPost.text===""){
        res.status(400).json({error:"please include text in your post"})
        return;
      }
      Posts.insert(newPost)
      .then((post)=>{
        res.status(201).json({...post,...newPost})
      })
      .catch((err)=>{
        res.status(500).json({error:err.message})
      })
    }
  })

})

router.get('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  const {id} = req.params;

  User.getUserPosts(id)
  .then((posts)=>{
    res.status(200).json(posts);
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })

});

// do not forget to export the router
module.exports=router;