// const express = require('express');
// const router = express.Router();
// const db = require('./database');

// Rota para obter todos os posts com comentários
// router.get('/posts', async (req, res) => {
//     const posts = await db.query(`SELECT posts.*, users.name AS username 
//                                   FROM posts 
//                                   JOIN users ON posts.user_id = users.id 
//                                   ORDER BY posts.created_at DESC`);
    
//     const comments = await db.query(`SELECT comments.*, users.name AS username 
//                                      FROM comments 
//                                      JOIN users ON comments.user_id = users.id 
//                                      ORDER BY comments.created_at ASC`);
    
//     res.json({ posts, comments });
// });

// Rota para adicionar um novo post
// router.post('/posts', async (req, res) => {
//     const { userId, content } = req.body;
//     await db.query(`INSERT INTO posts (user_id, content) VALUES (?, ?)`, [userId, content]);
//     res.status(201).json({ message: 'Post adicionado!' });
// });

// Rota para adicionar um comentário
// router.post('/comments', async (req, res) => {
//     const { userId, postId, content } = req.body;
//     await db.query(`INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`, [postId, userId, content]);
//     res.status(201).json({ message: 'Comentário adicionado!' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// Rota para obter todos os posts com comentários
router.get('/posts', async (req, res) => {
    const posts = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    const comments = await db.query('SELECT * FROM comments ORDER BY created_at ASC');
    res.json({ posts, comments });
});

// Rota para adicionar um novo post
router.post('/posts', async (req, res) => {
    const { userId, content } = req.body;
    await db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content]);
    res.status(201).json({ message: 'Post adicionado!' });
});

// Rota para adicionar um comentário
router.post('/comments', async (req, res) => {
    const { userId, postId, content } = req.body;
    await db.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
    res.status(201).json({ message: 'Comentário adicionado!' });
});

module.exports = router;

