const db = require('../config/db.js');

// exports.createPost = async (req, res) => {
//     const { message } = req.body;
//     const result = await db.query('INSERT INTO posts (message) VALUES (?)', [message]);
//     res.json({ id: result.insertId });
// };

exports.createPost = async (req, res) => {
    console.log('Requisição recebida para criar post:', req.body);
    const { message } = req.body;
    const result = await db.query('INSERT INTO posts (message) VALUES (?)', [message]);
    res.json({ id: result.insertId });
};

exports.getPosts = async (req, res) => {
    const [posts] = await db.query('SELECT * FROM posts');
    for (const post of posts) {
        const [comments] = await db.query('SELECT * FROM comments WHERE postId = ?', [post.id]);
        post.comments = comments;
    }
    res.json(posts);
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM posts WHERE id = ?', [id]);
    await db.query('DELETE FROM comments WHERE postId = ?', [id]);
    res.jsonStatus(204);
};
