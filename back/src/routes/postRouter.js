const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controller/postController');

router.post('/', createPost);
router.get('/', getPosts);
router.delete('/:id', deletePost);

module.exports = router;
