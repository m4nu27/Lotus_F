const connection = require('../config/db.js');

// Função para registrar uma emoção
async function registrarEmocao (request, response){
    const params = Array(
        request.body.data,
        request.body.emocao,
        request.body.observacao
    )

    const query = `INSERT INTO emocoes (data, emocao, observacao) VALUES (?, ?, ?)`

    connection.query(query, params, (err, results) => {
        if(results) {
            response 
                    .status(201)
                    .json({
                        success: true,
                        message: "Emoção registrada com sucesso!", 
                        data: results})
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(", 
                    data: err                         
                });
         }
    })
};

// Função para obter emoções de uma data específica
async function obterEmocoes(request, response) {
    const { data } = request.query; // Extrai a data dos parâmetros da requisição

    const query = `SELECT emocao, observacao FROM emocoes WHERE data = ?`;

    connection.query(query, [data], (err, results) => {
        if (results && results.length > 0) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Emoções obtidas com sucesso!",
                    data: results
                });
        } else if (results && results.length === 0) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Nenhuma emoção registrada para esta data.",
                    data: []
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao obter emoções.",
                    data: err
                });
        }
    });
};


module.exports = {
    registrarEmocao,
    obterEmocoes
};