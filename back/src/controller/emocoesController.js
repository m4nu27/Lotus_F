const connection = require('../config/db');

// Função para registrar emoção
const registrarEmocao = (req, res) => {
    const { emotion, observation } = req.body;

    if (!emotion || !observation) {
        return res.status(400).json({ error: 'Emoção e observação são obrigatórios.' });
    }

    const query = 'INSERT INTO emocoes (emocao, observacao) VALUES (?, ?)';
    connection.query(query, [emotion, observation], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco:', err);
            return res.status(500).json({ error: 'Erro ao registrar emoção.' });
        }
        res.status(200).json({ message: 'Emoção registrada com sucesso!' });
    });
};

module.exports = {
    registrarEmocao
};
