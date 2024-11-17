const db = require('../config/db.js'); // Conexão com o banco de dados

// Função para buscar todos os perfis
const getPerfis = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, nome, email FROM usuario');
        res.json(rows || []); // Garante que sempre retorna um array
    } catch (error) {
        console.error('Erro no getPerfis:', error); // Log completo do erro
        res.status(500).json({ message: 'Erro ao buscar perfis.' });
    }
};

// Função para excluir um perfil
const deletePerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM usuario WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }
        res.json({ message: 'Perfil excluído com sucesso!' });
    } catch (error) {
        console.error('Erro no deletePerfil:', error); // Log completo do erro
        res.status(500).json({ message: 'Erro ao excluir perfil.' });
    }
};

module.exports = { getPerfis, deletePerfil };