const connection = require('../config/db.js');

// Função para registrar uma emoção
async function registrarEmocao(request, response) {
    const params = [
        request.body.data,
        request.body.emocao,
        request.body.observacao
    ];

    const query = `INSERT INTO emocoes (data, emocao, observacao) VALUES (?, ?, ?)`;

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Emoção registrada com sucesso!",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(",
                    data: err
                });
        }
    });
}

// Função para obter emoções
async function obterEmocoes(request, response) {
    const data = request.body.data;

    const query = `SELECT * FROM emocoes WHERE data = ?`;
    connection.query(query, [data], (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao buscar emoções",
                data: err
            });
        }
    });
}


module.exports = {
    registrarEmocao,
    obterEmocoes
};
