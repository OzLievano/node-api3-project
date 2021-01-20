const express = require('express');
const User = require('./users-model.js')
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
//   const newUser = req.body;
//   console.log(newUser)

//   User.insert(newUser)
//   .then((users)=>{
//     res.status(201).json(...users,...newUser)
//   })
//   .catch((err)=>{
//     res.status(500).json({error:err.message})
//   })
// });

// router.get('/', (req, res) => {
//   // do your magic!
//   User.get()
//   .then((user)=>{
//     res.status(200).json(user);
//   })
//   .catch((err)=>{
//     res.status(500).json({error:err.message})
//   })
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
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports=router;