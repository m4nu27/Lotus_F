const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controller/postController');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id', postController.deletePost);

module.exports = router;
