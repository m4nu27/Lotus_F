// Importa a conexão com o banco de dados a partir do arquivo de configuração
const connection = require('../config/db.js');

// Função para registrar uma emoção no banco de dados
// Essa função recebe uma requisição com os dados de uma emoção (data, emoção e observação),
// e insere esses dados na tabela `emocoes`.
async function registrarEmocao(request, response) {
    // Extrai os parâmetros da requisição do corpo do JSON enviado pelo cliente
    const params = Array(
        request.body.data,        // Data em que a emoção foi registrada
        request.body.emocao,      // Emoção (emoji ou descrição)
        request.body.observacao   // Observação adicional fornecida pelo usuário
    );

    // Declara a consulta SQL para inserir os dados na tabela `emocoes`
    const query = `INSERT INTO emocoes (data, emocao, observacao) VALUES (?, ?, ?)`;

    // Executa a consulta no banco de dados
    connection.query(query, params, (err, results) => {
        // Caso a consulta seja bem-sucedida
        if (results) {
            response
                .status(201) // Retorna o status HTTP 201 (Criado)
                .json({
                    success: true,                // Indica sucesso
                    message: "Emoção registrada com sucesso!", // Mensagem de sucesso
                    data: results                // Retorna os resultados (metadados da inserção)
                });
        } else {
            // Caso ocorra um erro na execução da consulta
            response
                .status(400) // Retorna o status HTTP 400 (Requisição inválida)
                .json({
                    success: false,              // Indica falha
                    message: "Ops, deu problema :(", // Mensagem de erro
                    data: err                   // Retorna o erro ocorrido
                });
        }
    });
}

// Função para obter as emoções registradas para uma data específica
// Essa função recebe uma data como parâmetro da URL e retorna todas as emoções registradas para essa data.
async function obterEmocoes(request, response) {
    // Extrai a data selecionada dos parâmetros da URL
    const dataSelecionada = request.params.data;

    // Declara a consulta SQL para buscar as emoções registradas na data fornecida
    const query = `SELECT * FROM emocoes WHERE data = ?`;

    // Executa a consulta no banco de dados
    connection.query(query, [dataSelecionada], (err, results) => {
        // Caso a consulta seja bem-sucedida
        if (results) {
            response
                .status(200) // Retorna o status HTTP 200 (OK)
                .json({
                    success: true,     // Indica sucesso
                    data: results      // Retorna as emoções encontradas
                });
        } else {
            // Caso ocorra um erro na execução da consulta
            response
                .status(400) // Retorna o status HTTP 400 (Requisição inválida)
                .json({
                    success: false,  // Indica falha
                    data: err       // Retorna o erro ocorrido
                });
        }
    });
}

// Exporta as funções `registrarEmocao` e `obterEmocoes` para serem utilizadas em outras partes do sistema
module.exports = {
    registrarEmocao,
    obterEmocoes
};
