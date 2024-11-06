// forumController.js
const db = require('../database'); // Importa conexão com o banco

// Função para obter todas as mensagens do fórum
exports.getAllMessages = async (req, res) => {
  try {
    const [messages] = await db.query("SELECT * FROM forum_messages");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar mensagens." });
  }
};

// Função para criar uma nova mensagem
exports.createMessage = async (req, res) => {
  const { username, content } = req.body;
  try {
    await db.query("INSERT INTO forum_messages (username, content) VALUES (?, ?)", [username, content]);
    res.status(201).json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar mensagem." });
  }
};

// Função para adicionar comentário
exports.addComment = async (req, res) => {
  const { messageId, username, comment } = req.body;
  try {
    await db.query("INSERT INTO forum_comments (message_id, username, comment) VALUES (?, ?, ?)", [messageId, username, comment]);
    res.status(201).json({ message: "Comentário adicionado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar comentário." });
  }
};
