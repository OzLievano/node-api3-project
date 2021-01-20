const express = require('express');
const {validatePostId} = require('../middleware/middleware')
const Posts = require('./posts-model')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then((posts)=>{
    res.status(200).json(posts);
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })

});

router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const {id} = req.params;
  Posts.getById(id)
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch((err)=>{
    res.status(500).json({error:err.message})
  })
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const {id} = req.params;
  Posts.remove(id)
  .then((post)=>{
    res.status(200).json({message:'post deleted'})
  })
  .catch((err)=>{
    res.status(500).json({error:'unable to delete post'})
  })
});

router.put('/:id',validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const {id} = req.params;
  console.log(id,req);
  const changes = req.body;

  Posts.update(id,changes)
  .then((post)=>{
    res.status(200).json(post);
  })
});

// do not forget to export the router
module.exports = router;