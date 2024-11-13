const db = require('../config/db.js');

exports.createComment = async (req, res) => {
    const { postId, text } = req.body;
    const result = await db.query('INSERT INTO comments (postId, text) VALUES (?, ?)', [postId, text]);
    res.send({ id: result.insertId });
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM comments WHERE id = ?', [id]);
    res.sendStatus(204);
};
