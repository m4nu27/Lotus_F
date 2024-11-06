// forumRouter.js
const express = require('express');
const router = express.Router();
const forumController = require('./forumController');

// Rotas para as mensagens e comentários
router.get('/messages', forumController.getAllMessages);
router.post('/messages', forumController.createMessage);
router.post('/comments', forumController.addComment);

module.exports = router;
